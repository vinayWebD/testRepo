import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import ThreeDots from '../Icons/ThreeDots';
import Dropdown from '../common/Dropdown';
import ConfirmationModal from '../Modal/ConfirmationModal';

const CommentLayout = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex gap-2 mt-3">
      <Avatar name="A" classNames="w-[40px] h-[40px]" />
      <div className="relative flex flex-col justify-center gap-1 p-2 bg-whitelight rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text14 font-semibold text-greydark">Anna</div>
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs text-greylight">2 hours</p>
            <div className="w-[20px] relative top-1">
              <Dropdown
                options={[
                  { name: 'Edit', action: () => setIsEditModalOpen(true) },
                  { name: 'Delete', action: () => setIsDeleteModalOpen(true) },
                ]}
                IconComponent={() => <ThreeDots className="w-[4px] h-[20px] rotate-90" />}
                optionsClassName="!top-0"
              />
            </div>
          </div>
        </div>

        <ConfirmationModal
          title="Edit Comment"
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          Are you sure you want to edit this comment?
        </ConfirmationModal>

        <ConfirmationModal
          title="Delete Comment"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          primaryButtonTitle="No"
          secondaryButtonTitle="Yes"
        >
          Are you sure you want to delete this comment?
        </ConfirmationModal>

        <div className="text-[13px] lg:text14 text-greydark">
          {`Ready to make a difference in the world as a UX designer? 🌎 Our new course, "Design for a
          Better World,".,`}
        </div>
      </div>
    </div>
  );
};

export default CommentLayout;
