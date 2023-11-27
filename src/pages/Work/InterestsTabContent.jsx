import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import BlueDivider from '../../components/common/BlueDivider';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { UploadIcon } from '../../components/Icons/UploadIcon';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import { fetchWorkInterest } from '../../services/signup';
import { validationSchemaInterest } from '../../validations';
import check from '../../assets/images/check.png';
import cross from '../../assets/images/cross.png';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
export function InterestsTabContent() {
  const ref = useRef();
  const [career, setCareer] = useState('');
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const navigate = useNavigate();
  const { HOME } = PATHS;
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
    <div className="py-[36px] lg:px-[70px] md:px-[40px] px-[20px] bg-bluebg">
      <div className="tab-content-title">So far so good. Let’s talk about your Interests</div>
      <div className="tab-content-subtitle">We use this info for better reach.</div>

      <div className="md:flex block items-center mt-8 mb-5">
        <div className="w-[170px] form-title md:pb-0 pb-2">About Interests</div>
        <div className="grow">
          <TextArea
            height="h-[160px]"
            placeholder="Enter Description"
            value={interest}
            onChange={(e) => formikInterest.setFieldValue('interest', e.target.value)}
            // onBlur={interestSubmit}
            error={tuc_interest && err_interest}
            helperText={tuc_interest && err_interest}
          />
        </div>
      </div>
      <div className="grid justify-items-end pb-8">
        <Button label="Save" onClick={interestSubmit} showArrowIcon={false} />
      </div>
      <hr className="pb-8" style={{ color: 'rgba(161, 160, 160, 0.50)' }} />
      <div className="mb-8 flex justify-between">
        <div className="step-title">
          Interests
          <BlueDivider width={'50%'} />
        </div>
      </div>

      <div className="md:flex block items-center mt-8 mb-5">
        <div className="w-[155px] form-title md:pb-0 pb-2">Title</div>
        <div className={'grow des-title'}>
          <TextArea
            width="w-full md:w-[500px]"
            placeholder="Enter Title"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
          <img src={check} alt="check" style={{ marginLeft: '20px', cursor: 'pointer' }} />
          <img src={cross} alt="cross" style={{ marginLeft: '20px', cursor: 'pointer' }} />
        </div>
      </div>

      <div className="md:flex block items-center mt-8 mb-5">
        <div className="w-[155px] form-title md:pb-0 pb-2">Upload Photo</div>
        <div
          className="py-[16px] md:w-[240px] border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
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
      <div className="md:flex block items-center mt-8 mb-5">
        <div className="w-[155px] form-title md:pb-0 pb-2">Upload Video</div>
        <div
          className="py-[16px] md:w-[240px] border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
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
      <div className="grid justify-end">
        <OutlinedButton label="Save" showArrowIcon={false} />
      </div>
      <div>
        <div className="mt-[34px] flex justify-between flex-wrap">
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
              <OutlinedButton
                label="Skip"
                isSkip={true}
                onClick={() => navigate(HOME, { replace: true })}
              />
            </div>
            <div>{/* <Button label="Save" showArrowIcon={false} /> */}</div>
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
