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
import CreatePostLayout from '../../components/CreatePost/CreatePostLayout';
import Modal from '../../components/Modal';
import AddFriendIcon from '../../components/Icons/AddFriendIcon';

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
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        isTitle={true}
        title={'Create a Post'}
        childrenClassNames="overflow-y-auto"
      >
        <CreatePostLayout closePopupHandler={() => setIsSuccessModalOpen(false)} />
      </Modal>
    </PrivateLayout>
  );
};

export default HomePage;
