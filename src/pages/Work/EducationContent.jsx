import { useState } from 'react';
import { Button } from '../../components/common/Button';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';

export function EducationContent() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <InputBox label="School/College/University" placeholder="Enter School Name" />
        <InputBox label="Degree" placeholder="Enter Degree" />
        <InputBox label="Field of Study" placeholder="Enter Field of Study" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pb-6">
        <div className="md:col-span-1 col-span-3 ">
          <div className="grid grid-cols-2 gap-4">
            <InputBox type="date" label="Start Date" placeholder="Select Date" />
            <InputBox type="month" label="End date or expected" placeholder="Select Year" />
          </div>
        </div>
        <div className="md:col-span-2 col-span-3">
          <TextArea
            height="h-[48px]"
            label="Other (Activities, clubs, organizations and societies)"
            placeholder="Enter here"
          />
        </div>
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
              <InputBox label="School/College/University" placeholder="Enter School Name" />
            </div>
            <div className="pb-6">
              <InputBox label="Degree" placeholder="Enter Degree" />
            </div>
            <div className="pb-6">
              <InputBox label="Field of Study" placeholder="Enter Field of Study" />
            </div>
            <div className="grid grid-cols-2 gap-4 pb-4">
              <InputBox type="date" label="Start Date" placeholder="Select Date" />
              <InputBox type="month" label="End date or expected" placeholder="Select Year" />
            </div>
            <div className="mb-4">
              <TextArea
                height="h-[135px]"
                label="Other (Activities, clubs, organizations and societies)"
                placeholder="Enter here"
              />
            </div>
          </div>
          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
    </>
  );
}
