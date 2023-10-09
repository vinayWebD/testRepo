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
import { fetchPosts } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import Header from '../../components/Post/Header';
import CaptionLinkContainer from '../../components/Post/CaptionLinkContainer';
import ActionButtons from '../../components/Post/ActionButtons';
import Loader from '../../components/common/Loader';
import MediaLayout from '../../components/MediaLayout';

const { LANG_WRITE_SOMETHING } = LANG.PAGES.FEED;
const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenPopup = (type) => {
    setTypeOfPost(type);
    setIsCreatePostModalOpen(true);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
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
                    <MediaLayout media={post?.media} allowOnlyView={true} origin="feed" />
                  </div>

                  <ActionButtons
                    commentCount={post?.comment_count}
                    likeCount={post?.like_count}
                    shareCount={post?.share_count}
                    isLikedByMe={post?.is_liked_by_me}
                  />
                </Card>
              );
            })}

            {isLoading && <Loader />}
          </div>
        </div>

        <div className="col-span-3">
          <Card classNames="p-3"></Card>
        </div>
      </div>
      <Modal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        isTitle={true}
        title={'Create a Post'}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
      >
        <CreatePostLayout
          closePopupHandler={() => {
            setIsCreatePostModalOpen(false);
            setTypeOfPost(null);
          }}
          openTypeOfPost={typeOfPost}
          reloadData={fetchPost}
        />
      </Modal>
    </PrivateLayout>
  );
};

export default HomePage;
