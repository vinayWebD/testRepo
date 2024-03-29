import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileLayout from '../../components/ProfileLayout';
import FollowerContainer from '../../components/ProfileLayout/FollowerContainer';
import ProfileContainer from '../../components/ProfileLayout/ProfileContainer';
import Card from '../../components/common/Card';
import backIcon from '../../assets/images/backIcon.svg';
import noWork from '../../assets/images/noWork.svg';

import { useNavigate, useParams } from 'react-router-dom';
import OutlinedButton from '../../components/common/OutlinedButton';
import useScrollToTop from '../../hooks/useScrollToTop';
import InterestDetail from '../../components/ProfilePage/InterestDetail';
import WorkDetail from '../../components/ProfilePage/WorkDetail';
import MyPosts from '../../components/ProfilePage/MyPosts';
import { networkCount } from '../../services/myProfile';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { PATHS } from '../../constants/urlPaths';
import { TABS_NAME } from '../../constants/lang';
import Tabs from '../../components/ProfilePage/Tabs';

const { MYNETWORK } = PATHS;
const { FOLLOWERS, FOLLOWING, CONNECTIONS } = TABS_NAME;

const ProfilePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [tab, setTab] = useState('Posts');
  const [networkCounter, setNetworkCounter] = useState({});
  const navigate = useNavigate();
  const { type } = useParams();

  // Scrolling to top whenever user comes on this page for the first time
  useScrollToTop();

  useEffect(() => {
    const typeToMatch = type?.toLowerCase();
    if (typeToMatch === 'work') {
      setTab('Work');
    } else if (typeToMatch === 'interests') {
      setTab('Interests');
    } else if (typeToMatch === 'myself') {
      setTab('Myself');
    } else {
      setTab('Posts');
    }
  }, [type]);

  const fetchNetworkCount = async () => {
    const { status, data } = await networkCount();
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setNetworkCounter(data?.data);
    }
  };

  useEffect(() => {
    fetchNetworkCount();
  }, []);

  const handleUpdateTab = (value) => {
    value = value?.toLowerCase();
    setTab(value);
    navigate(`${PATHS.PROFILE}/${value}`, { replace: true });
  };

  return (
    <ProfileLayout>
      <div className="col-span-10 md:col-span-12 xs:col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-3 lg:sticky top-[61px] z-40 lg:h-fit	">
        {/* The profile info - image, name etc. */}
        <div
          className="flex text-[15px] md:text-[18px] lg:text-[24px] py-4 sticky h-fit cursor-pointer font-medium"
          onClick={() => navigate(-1)}
        >
          <img src={backIcon} alt="backIcon" className="w-[20px] lg:w-[30px]" />
          My Profile
        </div>
        <ProfileContainer userData={userData} />

        <FollowerContainer
          {...networkCounter}
          onFollowersClick={() => navigate(`${MYNETWORK}?type=${FOLLOWERS}`)}
          onFollowingClick={() => navigate(`${MYNETWORK}?type=${FOLLOWING}`)}
          onConnectionsClick={() => navigate(`${MYNETWORK}?type=${CONNECTIONS}`)}
        />
      </div>
      <div className="col-span-10 xs:col-span-12 sm:col-span-12 lg:col-span-8 md:col-span-12 xl:col-span-9 overflow-y-auto py-[12px] lg:my-14">
        <div className="grid grid-cols-12 gap-3 feed-page">
          <div className="col-span-12">
            <div>
              <Tabs tab={tab} updateTab={handleUpdateTab} />

              {tab === 'Posts' ? (
                <>
                  <MyPosts other={false} />
                </>
              ) : tab === 'Work' ? (
                <>
                  <WorkDetail />
                </>
              ) : tab === 'Interests' ? (
                <>
                  <InterestDetail />
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No Interests added yet.
                    </h4>
                    <div className="text-center mx-auto flex mt-2">
                      <OutlinedButton label={'Add Interests'} showArrowIcon={false} add />
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No work added yet.
                    </h4>
                    <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                      It helps people quickly identify your many talents.
                    </h5>
                    <div className="text-center mx-auto flex mt-2">
                      <OutlinedButton label={'Add'} showArrowIcon={false} add />
                    </div>
                  </Card>
                </>
              )}

              {/* {isLoading && <Loader />} */}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
