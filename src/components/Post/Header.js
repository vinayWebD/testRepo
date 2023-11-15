import React, { memo, useEffect, useState } from 'react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import ThreeDots from '../Icons/ThreeDots';
import timeSpan from '../../utils/timeSpan';

const Header = ({
  createdAt = '',
  creatorName = '',
  creatorProfilePicUrl = '',
  showThreeDots = true,
  isCreatedByMe = false,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isCreatedByMe) {
      setOptions([
        {
          name: 'Edit',
          action: () => {},
        },
        {
          name: 'Delete',
          action: () => {},
        },
        {
          name: 'Copy link',
          action: () => {},
        },
      ]);
    } else {
      setOptions([
        {
          name: 'Report',
          action: () => {},
        },
        {
          name: 'Unfollow',
          action: () => {},
        },
        {
          name: 'Copy link',
          action: () => {},
        },
      ]);
    }
  }, [isCreatedByMe]);

  return (
    <div className="flex gap-2 items-center">
      <Avatar
        name={creatorName}
        image={creatorProfilePicUrl}
        classNames="w-[50px] h-[50px] bg-greylight border border-greymedium"
      />
      <div>
        <p className="font-semibold capitalize">{creatorName}</p>
        <p className="text-[12px] text-greylight">{timeSpan(createdAt)}</p>
      </div>

      {showThreeDots && (
        <div className="ml-auto cursor-pointer">
          <Dropdown options={options} IconComponent={() => <ThreeDots />} />
        </div>
      )}
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.createdAt === nextProps.createdAt ||
    prevProps.creatorName === nextProps.creatorName ||
    prevProps.creatorProfilePicUrl === nextProps.creatorProfilePicUrl ||
    prevProps.showThreeDots === nextProps.showThreeDots
  );
};

export default memo(Header, areEqual);
