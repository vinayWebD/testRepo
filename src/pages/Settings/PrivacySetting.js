import React, { useEffect, useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import Card from '../../components/common/Card';
import privacySettingsFormOptions from './privacySettingsFormOptions';
import { Button } from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import {
  getPrivacySettingsDispatcher,
  updatePrivacySettingsDispatcher,
} from '../../redux/dispatchers/myProfileDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import RadioButtonsGroup from '../../components/common/RadioButtonsGroup';

const { SETTINGS } = PATHS;

const FORM = privacySettingsFormOptions;

const PrivacySetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchPrivacySetting();
  }, []);

  const handleSelect = (name, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const fetchPrivacySetting = async () => {
    const { status, data } = await dispatch(getPrivacySettingsDispatcher());
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setSettings(data?.data?.[0]);
    }
  };

  console.log(settings);

  const updateSettingsHandler = async () => {
    let settingsToPass = { ...settings };

    delete settingsToPass.id;
    delete settingsToPass.UserId;
    delete settingsToPass.updatedAt;
    delete settingsToPass.createdAt;

    const { status, data } = await dispatch(updatePrivacySettingsDispatcher(settingsToPass));
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      ToastNotifySuccess('Privacy Settings Updated successfully!');
    }
  };

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Privacy Setting'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <div className="flex flex-col gap-5">
          {FORM.map((form, index) => {
            const formKey = Object.keys(form)?.[0];
            return (
              <Card classNames="px-4 py-5" key={index}>
                <div className="w-full flex flex-col gap-3">
                  <p className="font-semibold text-[16px] mb-2">
                    {Object.values(form)?.[0]?.[0]?.title}
                  </p>
                  <RadioButtonsGroup
                    key={index}
                    options={Object.values(form)?.[0]}
                    name={formKey}
                    defaultValue={settings[formKey]}
                    onSelect={handleSelect}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="w-full flex justify-end items-center gap-5 mt-6">
          <div className="cursor-pointer text-[16px] text-greydark">Cancel</div>
          <Button label="Save" showArrowIcon={false} onClick={updateSettingsHandler} />
        </div>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default PrivacySetting;
