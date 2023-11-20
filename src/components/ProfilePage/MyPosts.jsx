/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { fetchPostDetails, fetchPosts } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import debounce from '../../utils/debounce';
import { PAGE_SIZE } from '../../constants/constants';
import Card from '../common/Card';
import Header from '../Post/Header';
import CaptionLinkContainer from '../Post/CaptionLinkContainer';
import MediaLayout from '../MediaLayout';
import ActionButtons from '../Post/ActionButtons';
import PostSkeleton from '../common/PostSkeleton';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useScrollToTop from '../../hooks/useScrollToTop';
import Modal from '../Modal';
import PostDetails from '../Post/PostDetails';
import noWork from '../../assets/images/noWork.svg';
import OutlinedButton from '../common/OutlinedButton';
import CreatePostLayout from '../CreatePost/CreatePostLayout';
import { LANG } from '../../constants/lang';

const { LANG_CREATE_POST } = LANG.PAGES.FEED;
function MyPosts({ other = true }) {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [posts, setPosts] = useState([]);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewDetailsPostOpen, setIsPreviewDetailsPostOpen] = useState(false);
  const [activePost, setActivePost] = useState({});
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [otherPeople, setOtherPeople] = useState(other)
  const { FEED: FEED_PAGE_SIZE } = PAGE_SIZE;
  let isLoadingAPI = false;
  const loaderRef = useRef(null);
  let { id: idFromUrl } = useParams();

  useScrollToTop();

  useEffect(() => {
    if (idFromUrl && !otherPeople) {
      fetchSinglePostDetails({ postId: idFromUrl });
      setIsPreviewDetailsPostOpen(true);
    }
  }, [idFromUrl]);

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
    if (isPreviewDetailsPostOpen === false) {
      // navigate(PATHS.HOME, { replace: true });
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

    const response = await fetchPosts({ page: page + 1, userId: idFromUrl ? idFromUrl : userData?.id });

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

  const handleOpenPopup = (type) => {
    setTypeOfPost(type);
    setIsCreatePostModalOpen(true);
  };

  return (
    <div>
      {posts?.length === 0 && (
        <>
          {isLoading ? (
            ['', ''].map((i, _i) => (
              <Card classNames="p-4 mt-4" key={`${i}${_i}`}>
                <span className="flex gap-2">
                  <span className="flex gap-2 w-full justify-center items-center">
                    <PostSkeleton showCaption={_i === 1} showMedia={_i === 1} />
                  </span>
                </span>
              </Card>
            ))
          ) : (
            <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
              <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
              <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                No posts added yet.
              </h4>
              <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                It helps people quickly identify your many talents.
              </h5>
              <div className="text-center mx-auto flex mt-2">
                <OutlinedButton
                  label={'Add'}
                  showArrowIcon={false}
                  add
                  onClick={() => handleOpenPopup('caption')}
                />
              </div>
            </Card>
          )}
        </>
      )}
      <div className="mt-3">
        {posts?.length !== 0 && (
          <>
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
          </>
        )}

        {/* This below is just to invoke the infinite loader, when this will get intresected, the API will get called */}
        {!allPostsLoaded && (
          <div ref={loaderRef} className="loading-more-indicator">
            <span className="flex gap-2">
              <span className="flex gap-2 w-full justify-center items-center"></span>
            </span>
          </div>
        )}
      </div>
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
    </div>
  );
}

export default MyPosts;
