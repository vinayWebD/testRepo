import { useSelector } from 'react-redux';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import PrivateLayout from '../../components/PrivateLayout';
import PhotoIcon from '../../components/Icons/PhotoIcon';
import VideoIcon from '../../components/Icons/VideoIcon';
import LinkIcon from '../../components/Icons/LinkIcon';
import { BUTTON_LABELS, LANG, PRIVATE_NAVIGATION_LABELS } from '../../constants/lang';
import { useEffect, useRef, useState } from 'react';
import CreatePostLayout from '../../components/CreatePost/CreatePostLayout';
import Modal from '../../components/Modal';
import { fetchPostDetails, fetchPosts } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import Header from '../../components/Post/Header';
import CaptionLinkContainer from '../../components/Post/CaptionLinkContainer';
import ActionButtons from '../../components/Post/ActionButtons';
import MediaLayout from '../../components/MediaLayout';
import PostDetails from '../../components/Post/PostDetails';
import UpChevronFilled from '../../components/Icons/UpChevronFilled';
import { PAGE_SIZE } from '../../constants/constants';
import useWindowScrolledDown from '../../hooks/useWindowScrolledDown';
import PostSkeleton from '../../components/common/PostSkeleton';
import useScrollToTop from '../../hooks/useScrollToTop';
import debounce from '../../utils/debounce';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const { LANG_WRITE_SOMETHING, LANG_CREATE_POST } = LANG.PAGES.FEED;
const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { NAVLBL_FEED } = PRIVATE_NAVIGATION_LABELS;

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPreviewDetailsPostOpen, setIsPreviewDetailsPostOpen] = useState(false);
  const [activePost, setActivePost] = useState({});
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const loaderRef = useRef(null);
  const hasUserScrolled = useWindowScrolledDown();
  let isLoadingAPI = false; // This we are using to avoid multiple API calls because of infinite scroll
  let { id: idFromUrl } = useParams(); // The post id that we want to display in post details
  const navigate = useNavigate();

  // Scrolling to top whenever user comes on this page for the first time
  useScrollToTop();

  const { FEED: FEED_PAGE_SIZE } = PAGE_SIZE;

  // This is for the infinite scroll pagination
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px', // Leaving no margin so that API does not get called before handedly
      threshold: 1,
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, posts]);

  useEffect(() => {
    if (idFromUrl) {
      fetchSinglePostDetails({ postId: idFromUrl });
      setIsPreviewDetailsPostOpen(true);
    }
  }, [idFromUrl]);

  useEffect(() => {
    if (isPreviewDetailsPostOpen === false) {
      navigate(PATHS.HOME);
    }
  }, [isPreviewDetailsPostOpen]);

  // When we reload the posts: maybe after creating new post, editing or deleting one
  const reloadPosts = async () => {
    setAllPostsLoaded(false);
    window.scrollTo(0, 0);
    await fetchAllPostsAPI(0, true);
  };

  const fetchAllPostsAPI = async (page, reloadForcefully = false) => {
    if (!reloadForcefully && allPostsLoaded && !isLoadingAPI && page !== 0) return; // prevent fetching if all posts are loaded

    const response = await fetchPosts({ page: page + 1 });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);

    if (!successStatus(status) && errormsg) {
      ToastNotifyError(errormsg, '');
    } else {
      setAllPostsLoaded(data?.data?.length < FEED_PAGE_SIZE); // if anytime the data returned from API is less than FEED_PAGE_SIZE, set all posts as loaded

      if (page === 0) {
        // For the first time we just need to set the data as is
        setPosts(data?.data);
        setCurrentPage(1);
      } else if (currentPage * FEED_PAGE_SIZE === posts.length) {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
        setCurrentPage((prevPage) => prevPage + 1);
      }

      setIsLoading(false);
      isLoadingAPI = false;
    }
  };

  const fetchAllPosts = debounce(fetchAllPostsAPI, currentPage === 0 ? 20 : 450); // Added debounce in the API calling so that multiple calls do not go because of inifnite scroll

  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.isIntersecting && target.intersectionRatio >= 1) {
      isLoadingAPI = true;
      setIsLoading(true);

      fetchAllPosts(currentPage);
    }
  };

  const handleOpenPopup = (type) => {
    setTypeOfPost(type);
    setIsCreatePostModalOpen(true);
  };

  const fetchSinglePostDetails = async ({ postId }) => {
    const response = await fetchPostDetails({ postId });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (!successStatus(status)) {
      ToastNotifyError(errormsg, '');
      setIsPreviewDetailsPostOpen(false);
    } else {
      if (posts?.length) {
        const allPosts = posts.map((post) => {
          if (activePost?.id === postId) {
            setActivePost(data?.data);
          }
          if (post?.id === postId) {
            return data?.data;
          } else {
            return post;
          }
        });

        setPosts(allPosts);
      } else {
        setActivePost(data?.data);
      }
    }
  };

  return (
    <PrivateLayout page={NAVLBL_FEED}>
      <div className="grid grid-cols-12 gap-5 feed-page">
        <div className="col-span-12">
          <Card classNames="p-5">
            <div className="">
              <div
                className="cursor-pointer flex gap-3 items-center pt-1 pb-3 lg:pt-4 lg:pb-6 border-0 border-b-[1px] border-b-greymedium hover:opacity-70"
                onClick={() => handleOpenPopup('caption')}
              >
                <Avatar
                  name={`${userData?.firstName} ${userData?.lastName}`}
                  image={userData.profilePictureUrl}
                  classNames="w-[40px] h-[40px]"
                />
                <p className="text-greylight text16">{LANG_WRITE_SOMETHING}</p>
              </div>
              <div className="flex md:gap-14 mt-3 pt-2 pb-1 lg:pt-3 lg:pb-2 justify-between md:justify-normal text16">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('photo')}
                >
                  <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('video')}
                >
                  <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('link')}
                >
                  <LinkIcon /> <p>{BTNLBL_LINK}</p>
                </div>
              </div>
            </div>
            {hasUserScrolled ? (
              <div className="fixed bottom-[65px] md:bottom-2 right-[10%] md:right-[22%] z-20">
                <button
                  type={'button'}
                  className={
                    'w-16 h-8 md:h-6 rounded-lg text-white bg-blueprimary text-xs flex gap-1 justify-center items-center hover:opacity-70'
                  }
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="text-xs">Top</span>
                  <UpChevronFilled />
                </button>
              </div>
            ) : (
              ''
            )}
          </Card>

          <div className="mt-3">
            {posts.map((post) => {
              return (
                <Card classNames="p-4 mt-[6px] md:mt-4" key={post?.postId}>
                  <Header
                    createdAt={post?.createdAt}
                    creatorName={`${post?.User?.firstName} ${post?.User?.lastName}`}
                    creatorProfilePicUrl={post?.User?.profilePictureUrl}
                    isCreatedByMe={post?.UserId === userData?.id}
                    postId={post?.postId}
                    reloadData={reloadPosts}
                    reloadPostDetails={fetchSinglePostDetails}
                    postDetails={{
                      caption: post?.caption,
                      media: post?.media,
                      links: post?.links,
                      id: post?.id,
                    }}
                  />
                  <CaptionLinkContainer caption={post?.caption} links={post?.links} />
                  <div className="mt-3">
                    <MediaLayout
                      media={post?.postMedia}
                      allowOnlyView={true}
                      origin="feed"
                      onMediaClickHandler={(customIndex) => {
                        // navigate(`${PATHS.PROFILE}/${post?.id}`);
                        setIsPreviewDetailsPostOpen(true);
                        setActivePost({ ...post });
                        setActiveMediaIndex(customIndex);
                      }}
                    />
                  </div>

                  <ActionButtons
                    commentCount={post?.commentCount}
                    likeCount={post?.likeCount}
                    shareCount={post?.shareCount}
                    isLikedByMe={post?.isLikedByMe}
                    postId={post?.id}
                    reloadPostDetails={fetchSinglePostDetails}
                    className="justify-between md:justify-start md:gap-[10%]"
                  />
                </Card>
              );
            })}

            {isLoading
              ? ['', ''].map((i, _i) => (
                  <Card classNames="p-4 mt-4" key={`${i}${_i}`}>
                    <span className="flex gap-2">
                      <span className="flex gap-2 w-full justify-center items-center">
                        <PostSkeleton showCaption={_i === 1} showMedia={_i === 1} />
                      </span>
                    </span>
                  </Card>
                ))
              : ''}

            {/* This below is just to invoke the infinite loader, when this will get intresected, the API will get called */}
            {!allPostsLoaded && (
              <div ref={loaderRef} className="loading-more-indicator">
                <span className="flex gap-2">
                  <span className="flex gap-2 w-full justify-center items-center"></span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        isTitle={true}
        title={LANG_CREATE_POST}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height="h-[100dvh] max-h-[100dvh] md:h-auto"
      >
        <CreatePostLayout
          closePopupHandler={() => {
            setIsCreatePostModalOpen(false);
            setTypeOfPost(null);
          }}
          openTypeOfPost={typeOfPost}
          reloadData={reloadPosts}
        />
      </Modal>

      <Modal
        isOpen={isPreviewDetailsPostOpen}
        onClose={() => setIsPreviewDetailsPostOpen(false)}
        isTitle={false}
        width="!w-[100vw] md:!w-[75vw]"
        childrenClassNames=""
        padding="!p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height="h-[100dvh] max-h-[100dvh] md:h-auto"
      >
        <PostDetails
          post={activePost}
          reloadPostDetails={fetchSinglePostDetails}
          customActiveIndex={activeMediaIndex}
          onCloseHandler={() => setIsPreviewDetailsPostOpen(false)}
        />
      </Modal>
    </PrivateLayout>
  );
};

export default HomePage;
