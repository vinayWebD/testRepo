import Checkbox from '../../components/Checkbox';
import InputBox from '../../components/InputBox';
import TextArea from '../../components/TextArea';

export function ExperienceContent() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
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
    </>
  );
}
