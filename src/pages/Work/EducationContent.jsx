import InputBox from '../../components/InputBox';

export function EducationContent() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <InputBox label="School/College/University" placeholder="Enter School Name" />
        <InputBox label="Degree" placeholder="Enter Degree" />
        <InputBox label="Field of Study" placeholder="Enter Field of Study" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 ">
          <div className="grid grid-cols-2 gap-4">
            <InputBox type="date" label="Start Date" placeholder="Select Date" />
            <InputBox type="date" label="End date or expected" placeholder="Select Year" />
          </div>
        </div>
        <div className="col-span-2 ">
          <InputBox
            label="Other (Activities, clubs, organizations and societies)"
            placeholder="Enter here"
          />
        </div>
      </div>
    </>
  );
}
