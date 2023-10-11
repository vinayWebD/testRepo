import { useSelector } from 'react-redux';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import PrivateLayout from '../../components/PrivateLayout';
import PhotoIcon from '../../components/Icons/PhotoIcon';
import VideoIcon from '../../components/Icons/VideoIcon';
import LinkIcon from '../../components/Icons/LinkIcon';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { useEffect, useState } from 'react';
import CreatePostLayout from '../../components/CreatePost/CreatePostLayout';
import Modal from '../../components/Modal';
import { fetchPostDetails, fetchPosts } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import Header from '../../components/Post/Header';
import CaptionLinkContainer from '../../components/Post/CaptionLinkContainer';
import ActionButtons from '../../components/Post/ActionButtons';
import Loader from '../../components/common/Loader';
import MediaLayout from '../../components/MediaLayout';
import PostDetails from '../../components/Post/PostDetails';
import AddFriendIcon from '../../components/Icons/AddFriendIcon';

const { LANG_WRITE_SOMETHING } = LANG.PAGES.FEED;
const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPreviewDetailsPostOpen, setIsPreviewDetailsPostOpen] = useState(false);
  const [activePost, setActivePost] = useState({});

  const handleOpenPopup = (type) => {
    setTypeOfPost(type);
    setIsCreatePostModalOpen(true);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    const response = await fetchPosts({ page: 1 });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    setIsLoading(false);
    if (!successStatus(status) && errormsg) {
      ToastNotifyError(errormsg, '');
    } else {
      setPosts(data?.results);
    }
  };

  const fetchSinglePostDetails = async ({ postId }) => {
    const response = await fetchPostDetails({ postId });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (!successStatus(status) && errormsg) {
      ToastNotifyError(errormsg, '');
    } else {
      const allPosts = posts.map((post) => {
        if (post?.post_id === postId) {
          return data;
        } else {
          return post;
        }
      });
      setPosts(allPosts);
      if (activePost?.post_id === postId) {
        setActivePost(data);
      }
    }
  };

  return (
    <PrivateLayout>
      <div className="grid grid-cols-12 gap-3 feed-page">
        <div className="col-span-9">
          <Card classNames="p-5">
            <div className="">
              <div
                className="cursor-pointer flex gap-3 items-center pt-4 pb-6 border-0 border-b-[1px] border-b-greymedium hover:opacity-70"
                onClick={() => handleOpenPopup('caption')}
              >
                <Avatar
                  name={`${userData?.first_name} ${userData?.last_name}`}
                  image={userData.profile_picture_url}
                  classNames="w-[40px] h-[40px]"
                />
                <p className="text-greylight">{LANG_WRITE_SOMETHING}</p>
              </div>
              <div className="flex gap-14 mt-3 pt-3 pb-2">
                <div
                  className="flex gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('photo')}
                >
                  <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
                </div>

                <div
                  className="flex gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('video')}
                >
                  <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
                </div>

                <div
                  className="flex gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => handleOpenPopup('link')}
                >
                  <LinkIcon /> <p>{BTNLBL_LINK}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-3">
            {posts.map((post) => {
              return (
                <Card classNames="p-4 mt-4" key={post?.post_id}>
                  <Header
                    createdAt={post?.created_at}
                    creatorName={post?.created_by}
                    creatorProfilePicUrl={post?.profile_image_url}
                  />
                  <CaptionLinkContainer caption={post?.caption} links={post?.links} />
                  <div className="mt-3">
                    <MediaLayout
                      media={post?.media}
                      allowOnlyView={true}
                      origin="feed"
                      onMediaClickHandler={() => {
                        setIsPreviewDetailsPostOpen(true);
                        setActivePost({ ...post });
                      }}
                    />
                  </div>

                  <ActionButtons
                    commentCount={post?.comment_count}
                    likeCount={post?.like_count}
                    shareCount={post?.share_count}
                    isLikedByMe={post?.is_liked_by_me}
                    postId={post?.post_id}
                    reloadPostDetails={fetchSinglePostDetails}
                  />
                </Card>
              );
            })}

            {isLoading && <Loader />}
          </div>
        </div>

        <div className="col-span-3">
          <Card>
            <div className="rounded-t-lg flex flex-col gap-2 blue-white-gradient p-3 text-white">
              <div className="flex items-center gap-2">
                <AddFriendIcon />
                <p className="font-semibold text-xl">Invite People</p>
              </div>
              <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="p-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70">
              Invite Now
            </div>
          </Card>

          <Card classNames="p-3 mt-[14px]">
            <p className="font-semibold text-base">Notification</p>

            <div className="border-b border-[#DFDFDF] mt-1 py-2">
              <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
              <p className="text-greymedium text-xs">2 Hours ago</p>
            </div>
            <div className="border-b border-[#DFDFDF] mt-1 py-2">
              <p className="greydark text-sm">
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-greymedium text-xs">2 Hours ago</p>
            </div>
            <div className="border-b border-[#DFDFDF] mt-1 py-2">
              <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
              <p className="text-greymedium text-xs">2 Hours ago</p>
            </div>

            <div className="pt-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70">
              View All
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        isTitle={true}
        title={'Create a Post'}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
      >
        <CreatePostLayout
          closePopupHandler={() => {
            setIsCreatePostModalOpen(false);
            setTypeOfPost(null);
          }}
          openTypeOfPost={typeOfPost}
          reloadData={fetchAllPosts}
        />
      </Modal>

      <Modal
        isOpen={isPreviewDetailsPostOpen}
        onClose={() => setIsPreviewDetailsPostOpen(false)}
        isTitle={false}
        width="!w-[75vw]"
        childrenClassNames=""
        padding="!p-0"
        titleClassNames=""
      >
        <PostDetails post={activePost} reloadPostDetails={fetchSinglePostDetails} />
      </Modal>
    </PrivateLayout>
  );
};

export default HomePage;
