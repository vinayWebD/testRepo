import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { getErrorMessage, successStatus } from '../../common';
import BlueDivider from '../../components/common/BlueDivider';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import TextArea from '../../components/TextArea';
import { fetchCareersList, fetchProfileEdit } from '../../services/signup';
import { validationSchemaAboutWork } from '../../validations';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import { CareerForm } from './CareerForm';
import Accordion from '../../components/Accordion';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import { CareerDetail } from './CareerDetail';
import { LIMITS } from '../../constants/constants';

export function WorkTabContent() {
  const [careerList, setCareerList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getCareerList = async () => {
    setIsLoading(true);
    const response = await fetchCareersList();
    const {
      status,
      data: { data },
    } = response;

    if (successStatus(status)) {
      setCareerList(data);
      setFieldValue('work', data?.work);
    }

    setIsLoading(false);
  };

  const initialWork = {
    work: careerList?.work || '',
  };

  const aboutWorkSubmitHandler = async () => {
    if (!isLoading && work?.trim()?.length) {
      setIsLoading(true);
      const response = await fetchProfileEdit({
        work,
      });
      const { status, data } = response;
      const errormsg = getErrorMessage(data);
      if (successStatus(status)) {
        getCareerList();
        ToastNotifySuccess('Description saved successfully', 'location-success');
      } else {
        if (errormsg) {
          ToastNotifyError(errormsg, 'location-failed');
        }
      }
      setIsLoading(false);
    }
  };

  const formikWork = useFormik({
    initialValues: initialWork,
    validationSchema: validationSchemaAboutWork,
    onSubmit: aboutWorkSubmitHandler,
  });

  const {
    values: { work },
    touched: { title: tuc_work },
    errors: { title: err_work },
    handleSubmit: handleWork,
    setFieldValue,
  } = formikWork;

  useEffect(() => {
    getCareerList();
  }, []);

  return (
    <div className="py-[36px] lg:px-[70px] md:px-[40px] px-[20px] bg-bluebg">
      <form onSubmit={handleWork}>
        <div className="tab-content-title">So far so good. Let’s talk about your work</div>
        <div className="tab-content-subtitle">We use this info for better reach.</div>

        <div className="md:flex block items-center mt-8 mb-5">
          <div className="w-[170px] form-title md:pb-0 pb-2">About work</div>
          <div className="grow">
            <TextArea
              height="h-[160px]"
              placeholder="Enter Description"
              name="work"
              value={work}
              onChange={(e) => formikWork.setFieldValue('work', e.target.value)}
              error={tuc_work && err_work}
              helperText={tuc_work && err_work}
              maxLength={LIMITS.MAX_ABOUT_WORK_LENGTH}
            />

            <div className="w-full text-right text-xs text-greylight">
              {work?.trim().length}/{LIMITS.MAX_ABOUT_WORK_LENGTH}
            </div>
          </div>
        </div>
        <div className="grid justify-items-end pb-8">
          <Button
            isDisabled={!work?.trim()?.length || careerList?.work === work}
            label="Save"
            type="submit"
            showArrowIcon={false}
            onlyShowLoaderWhenLoading={true}
            isLoading={isLoading}
          />
        </div>
      </form>
      <hr className="pb-8" style={{ color: 'rgba(161, 160, 160, 0.50)' }} />

      <div className="mb-8 flex justify-between ">
        <div className="step-title">
          Career
          <BlueDivider width={'60%'} />
        </div>
        <OutlinedButton
          disabled={careerList?.Careers?.length === 0}
          label="Add Career"
          Icon={<AddBlueIcon />}
          IconDisabled={<AddBlueIcon fill="#D1D1D1" />}
          onClick={() => {
            navigate(PATHS.PATH_ADD_CAREER);
          }}
        />
      </div>
      {careerList?.Careers?.length > 1 ? (
        <Accordion
          items={careerList?.Careers?.map((item) => {
            return {
              title: item?.title,
              content: <CareerDetail data={item} getCareerList={getCareerList} />,
            };
          })}
        />
      ) : (
        <CareerForm
          getCareerList={getCareerList}
          data={careerList?.Careers?.[0] || {}}
          id={careerList?.Careers?.[0]?.id}
        />
      )}

      {careerList?.Careers?.length > 0 && (
        <div className="mt-[36px] flex justify-end md:justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap"></div>
          <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
            <div>
              <Button
                label="Next"
                showArrowIcon={false}
                onClick={() => {
                  navigate(PATHS.PATH_INTERESTS);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
