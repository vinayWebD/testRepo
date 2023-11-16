import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileLayout from '../../components/ProfileLayout';
import FollowerContainer from '../../components/ProfileLayout/FollowerContainer';
import ProfileContainer from '../../components/ProfileLayout/ProfileContainer';
import Card from '../../components/common/Card';
import backIcon from '../../assets/images/backIcon.svg';
import noWork from '../../assets/images/noWork.svg';

import { useNavigate, useParams } from 'react-router-dom';
import InterestDetail from '../../components/ProfilePage/InterestDetail';
import WorkDetail from '../../components/ProfilePage/WorkDetail';
import useScrollToTop from '../../hooks/useScrollToTop';
import Tabs from '../../components/ProfilePage/Tabs';
import {
  fetchOtherUserBasicInfo,
  fetchOtherUserNetworkingCount,
} from '../../redux/dispatchers/otherUserDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { PATHS } from '../../constants/urlPaths';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';

const OtherUserProfile = () => {
  const [tab, setTab] = useState('work');
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [networkingCount, setNetworkingCount] = useState({});

  // Scrolling to top whenever user comes on this page for the first time
  useScrollToTop();

  useEffect(() => {
    fetchData();
  }, [id]);

  const reloadAfterFollowUnfollow = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    const { status, data } = await dispatch(fetchOtherUserBasicInfo({ id }));

    if (successStatus(status)) {
      setUserData(data?.data);
      const { status: countStatus, data: countData } =
        (await dispatch(fetchOtherUserNetworkingCount({ id }))) || {};
      if (successStatus(countStatus)) {
        setNetworkingCount(countData?.data);
      }
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
      navigate(PATHS.HOME);
    }
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
          Back
        </div>
        <ProfileContainer
          userData={userData}
          isOtherUser={true}
          reloadAfterFollowUnfollow={reloadAfterFollowUnfollow}
        />
        <FollowerContainer {...networkingCount} />
      </div>
      <div className="col-span-10 xs:col-span-12 sm:col-span-12 lg:col-span-8 md:col-span-12 xl:col-span-9 overflow-y-auto py-[12px] lg:my-14">
        <div className="grid grid-cols-12 gap-3 feed-page">
          <div className="col-span-12">
            <div>
              <Tabs tab={tab} updateTab={setTab} />

              {tab === 'work' ? (
                <>
                  <WorkDetail />
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No work added yet.
                    </h4>
                  </Card>
                </>
              ) : tab === 'interest' ? (
                <>
                  <InterestDetail />
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No Interests added yet.
                    </h4>
                  </Card>
                </>
              ) : (
                <>
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No work added yet.
                    </h4>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default OtherUserProfile;
