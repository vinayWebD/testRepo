import { useState } from 'react';
import Checkbox from '../../components/Checkbox';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';

export function ExperienceContent() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <InputBox label="Title" placeholder="Enter Title" />
        <InputBox label="Company Name" placeholder="Enter Company Name" />
        <div className="grid grid-cols-2 gap-4">
          <InputBox type="date" label="Start Date" placeholder="Select Date" />
          <InputBox type="date" label="End Date" placeholder="Select Date" />
        </div>
      </div>
      <div className="mt-6 mb-[42px]">
        <TextArea label="Description" height="h-[50px]" placeholder="Enter Description" />
      </div>
      <div className="flex gap-[24px] pb-[45px]">
        <Checkbox /> <span>I am currently working on this role.</span>
      </div>

      <Modal
        isTitle={true}
        title="Edit Education"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox label="Title" placeholder="Enter Title" className />
            </div>
            <div className="pb-6">
              <InputBox label="Company Name" placeholder="Enter Company Name" />
            </div>
            <div className="grid grid-cols-2 gap-4 pb-4">
              <InputBox type="date" label="Start Date" placeholder="Select Date" />
              <InputBox type="date" label="End Date" placeholder="Select Date" />
            </div>
            <div className="flex gap-[12px] items-center mb-6">
              <Checkbox />
              <span className="para-checkbox">I am currently working on this role.</span>
            </div>
            <div className="mb-4">
              <TextArea label="Description" height="h-[230px]" placeholder="Enter Description" />
            </div>
          </div>
          <div className="bg-greymedium h-[1px] w-full" />
          <div className="flex justify-between pt-6 pb-5 px-6">
            <OutlinedButton isDelete={true} label="Delete" />
            <Button label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
    </>
  );
}
