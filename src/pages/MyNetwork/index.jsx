/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useScrollToTop from '../../hooks/useScrollToTop';
import Tabs from '../../components/common/Tabs';
import MyNetworkTabSection from './MyNetworkTabSection';
import { TABS_NAME } from '../../constants/lang';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
const { FOLLOWERS, FOLLOWING, CONNECTIONS } = TABS_NAME;
const MyNetwork = () => {
  const [selectedTab, setSelectedTab] = useState('Following');

  // Scrolling to top whenever user comes on this page for the first time
  useScrollToTop();

  const handleSetTab = (selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <SectionLayout activeTab={1}>
      <div className="col-span-10 xs:col-span-12 sm:col-span-12 lg:col-span-8 md:col-span-12 xl:col-span-9 overflow-y-auto lg:mb-6 lg:mt-4">
        <div className="grid grid-cols-12 gap-3 feed-page">
          <div className="col-span-12">
            <div>
              <Tabs
                handleSetTab={handleSetTab}
                selectedTab={selectedTab}
                tabs={[FOLLOWERS, FOLLOWING, CONNECTIONS]}
              />
              <MyNetworkTabSection selectedTab={selectedTab} />
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default MyNetwork;
