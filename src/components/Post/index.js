import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import ThreeDots from '../Icons/ThreeDots';
import Dropdown from '../common/Dropdown';

const OPTIONS = [
  {
    name: 'Report',
    action: () => {},
  },
  {
    name: 'Save',
    action: () => {},
  },
  {
    name: 'Hide',
    action: () => {},
  },
];

const Post = () => {
  return (
    <Card classNames="p-4">
      <div className="flex gap-2 items-center">
        <Avatar
          name={'Ayushi Dangayach'}
          image={null}
          classNames="w-[50px] h-[50px] bg-greylight"
        />
        <div>
          <p className="font-semibold">Cole Haawkk</p>
          <p className="text-[12px] text-greylight">22 June 2023</p>
        </div>

        <div className="ml-auto cursor-pointer">
          <Dropdown options={OPTIONS} IconComponent={() => <ThreeDots />} />
        </div>
      </div>
      <div className="mt-3 flex gap-2 flex-col">
        <p className="text-sm">
          {`Ready to make a difference in the world as a UX designer? 🌎 Our new course, "Design for a
          Better World," with Don Norman as your instructor, is the perfect way to get st...`}
        </p>
        <a
          href="https://www.purdriven.com/feed/?trk=homepage-basic_sign-in-submit"
          className="text-sm text-[#70baff]"
        >
          https://www.purdriven.com/feed/?trk=homepage-basic_sign-in-submit
        </a>
      </div>
    </Card>
  );
};

export default Post;
