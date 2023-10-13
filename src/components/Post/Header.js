import React, { memo } from 'react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import ThreeDots from '../Icons/ThreeDots';
import moment from 'moment';

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

const Header = ({ createdAt = '', creatorName = '', creatorProfilePicUrl = '' }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        name={creatorName}
        image={creatorProfilePicUrl}
        classNames="w-[50px] h-[50px] bg-greylight border border-greymedium"
      />
      <div>
        <p className="font-semibold capitalize">{creatorName}</p>
        <p className="text-[12px] text-greylight">{moment(createdAt).format('DD MMMM YYYY')}</p>
      </div>

      <div className="ml-auto cursor-pointer">
        <Dropdown options={OPTIONS} IconComponent={() => <ThreeDots />} />
      </div>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.createdAt === nextProps.createdAt ||
    prevProps.creatorName === nextProps.creatorName ||
    prevProps.creatorProfilePicUrl === nextProps.creatorProfilePicUrl
  );
};

export default memo(Header, areEqual);