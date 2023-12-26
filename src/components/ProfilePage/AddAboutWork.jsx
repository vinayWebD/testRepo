import React, { useEffect, useState } from 'react';
import TextArea from '../TextArea';
import { Button } from '../common/Button';
import Divider from '../common/Divider';

import { LIMITS } from '../../constants/constants';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { getErrorMessage, successStatus } from '../../common';
import { fetchProfileEdit } from '../../services/signup';

const AddAboutWork = ({ onCloseHandler = () => {}, work }) => {
  const [aboutWork, setAboutWork] = useState(work);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAboutWork(work);
  }, [work]);

  const onClickHandler = async () => {
    if (isLoading) {
      return;
    }

    if (!aboutWork?.trim()?.length || aboutWork?.trim()?.length > LIMITS.MAX_ABOUT_WORK_LENGTH) {
      ToastNotifyError(
        `Enter a valid About work description of up to ${LIMITS.MAX_ABOUT_WORK_LENGTH} characters`,
      );
    } else {
      setIsLoading(true);
      const response = await fetchProfileEdit({
        work: aboutWork,
      });
      const { status, data } = response;
      const errormsg = getErrorMessage(data);
      if (successStatus(status)) {
        ToastNotifySuccess('About work saved successfully', '');
        onCloseHandler();
      } else {
        if (errormsg) {
          ToastNotifyError(errormsg, 'location-failed');
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className=" max-h-[83dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
        <div className="relative px-[18px] flex flex-col gap-2">
          <div className="grow">
            <TextArea
              height="h-[160px]"
              placeholder="Enter Description"
              name="work"
              value={aboutWork}
              handleChange={(val) => setAboutWork(val)}
              maxLength={LIMITS.MAX_ABOUT_WORK_LENGTH}
            />

            <div className="w-full text-right text-xs text-greylight">
              {aboutWork?.trim().length}/{LIMITS.MAX_ABOUT_WORK_LENGTH}
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="text-end flex justify-end mr-4">
        <Button
          isDisabled={!aboutWork?.trim()?.length}
          label={'Save'}
          additionalClassNames=" sm:px-[24px] sm:py-[15px] mt-4  items-center text-xs min-[320px]:px-[30px] min-[320px]:py-[15px] "
          showArrowIcon={false}
          onClick={onClickHandler}
          isLoading={isLoading}
          onlyShowLoaderWhenLoading={true}
        />
      </div>
    </div>
  );
};

export default AddAboutWork;
