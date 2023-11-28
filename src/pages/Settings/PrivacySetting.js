import React from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import Card from '../../components/common/Card';
import RadioButton from '../../components/common/RadioButton';
import privacySettingsFormOptions from './privacySettingsFormOptions';
import { Button } from '../../components/common/Button';

const { SETTINGS } = PATHS;

const FORM = privacySettingsFormOptions;

const PrivacySetting = () => {
  const navigate = useNavigate();

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Privacy Setting'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <div className="flex flex-col gap-5">
          {FORM.map((form, _i) => {
            return (
              <Card classNames="px-4 py-5" key={_i}>
                <div className="w-full flex flex-col gap-3">
                  <p className="font-semibold text-[16px] mb-2">{Object.keys(form)?.[0]}</p>

                  {Object.values(form)?.[0]?.map((f, __i) => {
                    return <RadioButton key={__i} label={f?.label} name={_i} value={f?.value} />;
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="w-full flex justify-end items-center gap-5 mt-6">
          <div className="cursor-pointer text-[16px] text-greydark">Cancel</div>
          <Button label="Save" showArrowIcon={false} />
        </div>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default PrivacySetting;
