import { useFormik } from 'formik';
import { useRef, useState } from 'react';
// import Accordion from '../../components/Accordion';
import BlueDivider from '../../components/common/BlueDivider';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { UploadIcon } from '../../components/Icons/UploadIcon';
// import { BookIcon } from '../../components/Icons/BookIcon';
// import { CertificateIcon } from '../../components/Icons/CertificateIcon';
// import { ExperienceIcon } from '../../components/Icons/ExperienceIcon';
// import { MediaIcon } from '../../components/Icons/MediaIcon';
// import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import { fetchWorkInterest } from '../../services/signup';
import { validationSchemaInterest } from '../../validations';
// import { CertificateContent } from './CertificateContent';
// import { EducationContent } from './EducationContent';
// import { ExperienceContent } from './ExperienceContent';
// import { MediaContent } from './MediaContent';

export function InterestsTabContent() {
  const ref = useRef();
  const [career, setCareer] = useState('');
  // const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  const initialWork = {
    interest: '',
  };

  const interestSubmit = async () => {
    let dataToSend = {
      work: '',
      interest: 'formikWork.values.interest',
    };

    await fetchWorkInterest(dataToSend);
  };

  const formikInterest = useFormik({
    initialValues: initialWork,
    validationSchema: validationSchemaInterest,
    onSubmit: interestSubmit,
  });

  const {
    values: { interest = '' },
    touched: { title: tuc_interest },
    errors: { title: err_interest },
  } = formikInterest;

  return (
    <div className="py-[36px] px-[70px] bg-bluebg">
      <div className="tab-content-title">So far so good. Let’s talk about your Interests</div>
      <div className="tab-content-subtitle">We use this info for better reach.</div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[170px] form-title">About Interests</div>
        <div className="grow">
          <TextArea
            height="h-[160px]"
            placeholder="Enter Description"
            value={interest}
            onChange={(e) => formikInterest.setFieldValue('interest', e.target.value)}
            onBlur={interestSubmit}
            error={tuc_interest && err_interest}
            helperText={tuc_interest && err_interest}
          />
        </div>
      </div>
      <div className="mb-8 flex justify-between">
        <div className="step-title">
          Interests
          <BlueDivider />
        </div>
      </div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[155px] form-title">Title</div>
        <div className="grow">
          <TextArea
            width="w-full md:w-[500px]"
            placeholder="Enter Title"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[155px] form-title">Upload Photo</div>
        <div
          className="py-[16px] w-[240px] border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
          onClick={() => ref.current.click()}
          label="Attach Document"
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">
              <UploadIcon />
            </span>
            <span className="upload-btn">Upload jpg/pdf</span>
          </div>
          <input
            className="hidden"
            id="attach-document"
            multiple
            ref={ref}
            type="file"
            // onChange={handleFileEvent}
          />
        </div>
      </div>
      <div className="flex items-center mt-8 mb-5">
        <div className="w-[155px] form-title">Upload Video</div>
        <div
          className="py-[16px] w-[240px] border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
          onClick={() => ref.current.click()}
          label="Attach Document"
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">
              <UploadIcon />
            </span>
            <span className="upload-btn">Upload Video</span>
          </div>
          <input
            className="hidden"
            id="attach-document"
            multiple
            ref={ref}
            type="file"
            // onChange={handleFileEvent}
          />
        </div>
      </div>
      <div className="grid justify-items-end">
        <OutlinedButton label="Save" showArrowIcon={false} />
      </div>
      <div>
        <div className="mt-[24px] flex justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <div>
              <OutlinedButton
                label="Add Other"
                Icon={<AddBlueIcon />}
                onClick={() => setIsLinksModalOpen(true)}
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <div>
              <OutlinedButton label="Skip" isSkip={true} />
            </div>
            <div>
              <Button label="Save" showArrowIcon={false} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isTitle={true}
        title="Add Interests"
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <label>Title</label>
            <div className="grow">
              <TextArea
                width="w-full md:w-full"
                placeholder="Enter Title"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2 px-6">
            <label>Upload Photo</label>
            <div
              className="py-[16px] w-full border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
              onClick={() => ref.current.click()}
              label="Attach Document"
            >
              <div className="flex items-center justify-center">
                <span className="mr-2">
                  <UploadIcon />
                </span>
                <span className="upload-btn">Upload jpg/pdf</span>
              </div>
              <input
                className="hidden"
                id="attach-document"
                multiple
                ref={ref}
                type="file"
                // onChange={handleFileEvent}
              />
            </div>
          </div>
          <div className="mb-5 px-6">
            <label>Upload Video</label>
            <div
              className="py-[16px] w-full border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
              onClick={() => ref.current.click()}
              label="Attach Document"
            >
              <div className="flex items-center justify-center">
                <span className="mr-2">
                  <UploadIcon />
                </span>
                <span className="upload-btn">Upload Video</span>
              </div>
              <input
                className="hidden"
                id="attach-document"
                multiple
                ref={ref}
                type="file"
                // onChange={handleFileEvent}
              />
            </div>
          </div>
          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end px-6 pt-6">
            <OutlinedButton label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
    </div>
  );
}
