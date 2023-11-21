import React from 'react';
import BlockedImage from '../../assets/images/blocked.svg';
import PasswordImage from '../../assets/images/password.svg';
import DeleteImage from '../../assets/images/delete.svg';
import PrivacySettingImage from '../../assets/images/privacy-setting.svg';
import HelpCenterImage from '../../assets/images/help-center.svg';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { PATHS } from '../../constants/urlPaths';
import { useNavigate } from 'react-router-dom';

const { SETTINGS_CHANGE_PASSWORD } = PATHS;

const INNER_SECTION = [
  {
    title: 'Change Password',
    iconSrc: PasswordImage,
    path: SETTINGS_CHANGE_PASSWORD,
  },
  {
    title: 'Blocked Users',
    iconSrc: BlockedImage,
  },
  {
    title: 'Privacy Setting',
    iconSrc: PrivacySettingImage,
  },
  {
    title: 'Delete Account',
    iconSrc: DeleteImage,
  },
  {
    title: 'Help Center',
    iconSrc: HelpCenterImage,
  },
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <SectionLayout activeTab={4}>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <InnerSectionLayout heading={'Settings'}>
            <div className="px-4 py-2">
              {INNER_SECTION.map((section, _i) => {
                return (
                  <div
                    key={_i}
                    className={`flex gap-3 py-4 px-6 bg-[#F5F5F566] rounded-s items-center cursor-pointer hover:opacity-70 ${
                      _i !== 0 ? 'mt-4' : ''
                    } `}
                    onClick={() => navigate(section.path)}
                  >
                    <div className="p-1 bg-[#0081CC0D] rounded-s">
                      <img src={section?.iconSrc} />
                    </div>
                    <p className="text-blueprimary text-[17px] md:text-[20px] font-medium">
                      {section?.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </InnerSectionLayout>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Settings;
