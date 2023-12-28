import React, { useState } from 'react';
import Card from '../common/Card';
import edit from '../../assets/images/editIcon.svg';
import OutlinedButton from '../common/OutlinedButton';
import { fetchCareersList, fetchOtherUserCareer } from '../../services/signup';
import { successStatus } from '../../common';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import SpinningLoader from '../common/SpinningLoader';
import CareerView from './CareerView';
import Modal from '../Modal';
import AddAboutWork from './AddAboutWork';
import noWork from '../../assets/images/noWork.svg';

function WorkDetail({ otherUserId = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [careers, setCareers] = useState([]);
  const [aboutWork, setAboutWork] = useState('');
  const [isOpenAboutWorkModal, setIsOpenAboutWorkModal] = useState(false);
  const navigate = useNavigate();

  const getCareerList = async () => {
    if (!isLoading) {
      setIsLoading(true);
      let response = {};
      if (otherUserId) {
        response = await fetchOtherUserCareer({ userId: otherUserId });
      } else {
        response = await fetchCareersList();
      }
      const {
        status,
        data: { data },
      } = response;

      if (successStatus(status)) {
        setCareers(data?.Careers);
        setAboutWork(data?.work || '');
      }

      setIsLoading(false);
    }
  };

  useState(() => {
    getCareerList();
  }, []);

  const openAboutWorkModal = () => {
    setIsOpenAboutWorkModal(true);
  };

  const showWork = () => {
    if (aboutWork) {
      return (
        <div className="p-4 flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-blueprimary text-[16px] font-semibold">About work</div>
            <div className="font-normal text-greydark text-[14px] my-3">{aboutWork}</div>
          </div>

          {otherUserId ? (
            ''
          ) : (
            <div className="flex items-center justify-between">
              <div
                className="bg-iconBackground p-1 rounded cursor-pointer"
                onClick={openAboutWorkModal}
              >
                <img src={edit} alt="edit" />
              </div>
            </div>
          )}
        </div>
      );
    } else if (!aboutWork && !otherUserId) {
      return (
        <div className="p-4 flex flex-col">
          <p className="text-[16px] font-semibold text-greydark w-full md:w-[80%]">
            {`Add your experience. Feel free to provide details or specific information you'd
              like to include.`}
          </p>

          <div className="text-center mt-4 hover:opacity-70">
            <OutlinedButton
              label={'Add About Work'}
              showArrowIcon={false}
              add
              onClick={openAboutWorkModal}
            />
          </div>
        </div>
      );
    }
  };

  const showCareers = () => {
    if (careers?.length) {
      return (
        <div className="flex flex-col gap-6 mt-6">
          {careers?.map((career) => (
            <CareerView key={career?.id} career={career} isEditable={!otherUserId} />
          ))}
        </div>
      );
    } else if (!otherUserId) {
      return (
        <p className="px-4 pt-4 w-full md:w-[80%] text-[16px] font-semibold mt-8 text-greydark">
          Your information will be grouped and displayed by career field. It helps people quickly
          identify your many talents.
        </p>
      );
    }
  };

  return isLoading ? (
    <Card classNames="p-4 mt-4 h-[calc(100vh-275px)]">
      <div className="h-full w-full flex justify-center items-center">
        <SpinningLoader width="w-8" height="h-8" />
      </div>
    </Card>
  ) : !aboutWork && !careers?.length && otherUserId ? (
    <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
      <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
      <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
        No work added yet.
      </h4>
    </Card>
  ) : (
    <Card classNames="mt-4 min-h-[calc(100vh-275px)]">
      {showWork()} {showCareers()}
      {!otherUserId ? (
        <>
          <div className="text-center mx-auto flex mt-3 hover:opacity-70 p-4 ">
            <OutlinedButton
              label={'Add Career'}
              showArrowIcon={false}
              add
              onClick={() => navigate(PATHS.PROFILE_ADD_EDIT_CAREER)}
            />
          </div>
          <Modal
            isOpen={isOpenAboutWorkModal}
            onClose={() => setIsOpenAboutWorkModal(false)}
            isTitle={true}
            title={`${aboutWork ? 'Update' : 'Add'} About work`}
            childrenClassNames="overflow-y-auto"
            padding="p-0"
            titleClassNames=""
            titleParentClassNames="md:m-3 m-0"
            height=" max-h-[100dvh] md:h-auto"
          >
            <AddAboutWork
              work={aboutWork}
              onCloseHandler={() => {
                setIsOpenAboutWorkModal(false);
                getCareerList();
              }}
            />
          </Modal>
        </>
      ) : (
        // Adding this div so that there is a gap from bottom when viewing other user's data
        <div className="w-full py-4"></div>
      )}
    </Card>
  );
}

export default WorkDetail;
