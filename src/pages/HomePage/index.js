import { useSelector } from 'react-redux';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import PrivateLayout from '../../components/PrivateLayout';
import PhotoIcon from '../../components/Icons/PhotoIcon';
import VideoIcon from '../../components/Icons/VideoIcon';
import LinkIcon from '../../components/Icons/LinkIcon';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import Post from '../../components/Post';
import { useState } from 'react';
import Modal from '../../components/Modal';
import EmojiTextarea from '../../components/common/EmojieTextarea';

const { LANG_WRITE_SOMETHING } = LANG.PAGES.FEED;
const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;

const HomePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <PrivateLayout>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-9">
          <Card classNames="p-5">
            <div className="" onClick={() => setIsSuccessModalOpen(true)}>
              <div className="cursor-pointer flex gap-3 items-center pt-4 pb-6 border-0 border-b-[1px] border-b-greymedium">
                <Avatar
                  name={`${userData?.first_name} ${userData?.last_name}`}
                  image={userData.profile_picture_url}
                  classNames="w-[40px] h-[40px]"
                />
                <p className="text-greylight">{LANG_WRITE_SOMETHING}</p>
              </div>
              <div className="flex gap-14 mt-3 pt-3 pb-2">
                <div className="flex gap-2">
                  <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
                </div>

                <div className="flex gap-2">
                  <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
                </div>

                <div className="flex gap-2">
                  <LinkIcon /> <p>{BTNLBL_LINK}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-3">
            <Post />
          </div>
        </div>

        <div className="col-span-3">
          <Card classNames="p-3"></Card>
        </div>
      </div>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        isTitle={true}
        title={'Create a Post'}
      >
        <div className="relative">
          <EmojiTextarea />
        </div>
        <div className="flex gap-14 mt-3 pt-3 pb-2">
          <div className="flex gap-2">
            <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
          </div>

          <div className="flex gap-2">
            <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
          </div>

          <div className="flex gap-2">
            <LinkIcon /> <p>{BTNLBL_LINK}</p>
          </div>
        </div>
      </Modal>
    </PrivateLayout>
  );
};

export default HomePage;
