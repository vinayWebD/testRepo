import { SkillsChipsBlue } from '../../components/Chips';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
// import {
//   fetchCareerLinkslist,
//   fetchCareerSkillslist,
// } from '../../services/signup';
import dummy from '../../assets/images/dummy.svg';
import { useDispatch } from 'react-redux';
import { deleteWorkDispatcher } from '../../redux/dispatchers/infoDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { useState } from 'react';
import { ExperienceData } from '../../components/common/Work/ExperienceData';
import EducationData from '../../components/common/Work/EducationData';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import CertificateData from '../../components/common/Work/CertificateData';

export function CareerDetail({ data: item, getCareerList = () => {} }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCareer = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await dispatch(deleteWorkDispatcher({ id: item?.id }));
    const { status, data } = response;
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setIsDeleteModalOpen(false);
      await getCareerList();
    }
    setIsLoading(false);
  };

  // const getLinksList = async () => {
  //   const response = await fetchCareerLinkslist(item?.id);
  //   const {
  //     status,
  //     data: { results = [] },
  //   } = response;
  //   if (successStatus(status)) {
  //     setLinksList(results);
  //   }
  // };

  // const getSkillsList = async () => {
  //   const response = await fetchCareerSkillslist(item?.id);
  //   const {
  //     status,
  //     data: { results = [] },
  //   } = response;
  //   if (successStatus(status)) {
  //     setSkillsList(results);
  //   }
  // };

  return (
    <>
      <div className="pb-5">
        {/* If no data has been added, then we can show a custom message */}
        {!item?.CareerMedia?.length &&
        !item?.Experiences?.length &&
        !item?.Education?.length &&
        !item?.Certificates?.length &&
        !item?.Links?.length &&
        !item?.Skills?.length ? (
          <div className="flex flex-col justify-center text-center items-center">
            <p>No career details added yet.</p>
            <p>
              Tap{' '}
              <strong
                className="cursor-pointer"
                onClick={() => navigate(`${PATHS.PATH_ADD_CAREER}/${item?.id}`, { replace: true })}
              >
                here
              </strong>{' '}
              to begin with.
            </p>
          </div>
        ) : (
          ''
        )}

        {item?.CareerMedia?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="form-title-blue">Media</span>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
              <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
              <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
              <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
              <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
              <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            </div>
            <div className="pt-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
        ) : (
          ''
        )}

        {item?.Experiences?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="form-title-blue">Experience</span>
              </div>
            </div>

            {item?.Experiences?.map((exp) => {
              return <ExperienceData key={exp?.id} data={exp} isEditable={false} />;
            })}
          </div>
        ) : (
          ''
        )}

        {item?.Education?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="form-title-blue">Education</span>
              </div>
            </div>

            {item?.Education?.map((ed) => {
              return <EducationData data={ed} key={ed?.id} isEditable={false} />;
            })}
          </div>
        ) : (
          ''
        )}

        {item?.Certificates?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="form-title-blue">Certifications</span>
              </div>
            </div>
            {item?.Certificates?.map((cert) => {
              return <CertificateData data={cert} key={cert?.id} isEditable={false} />;
            })}
          </div>
        ) : (
          ''
        )}

        {item?.Links?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="form-title-blue">Links</span>
              </div>
            </div>
            <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
              <div>
                <div className="detail-label">Faxquote</div>
                <div className="text-[14px]" style={{ color: '#3366CC', fontWeight: '400' }}>
                  http://www.faxquote.com
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {item?.Skills?.length ? (
          <div className="w-full text-left py-[17px] px-[24px] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="form-title-blue">Skills</span>
              </div>
            </div>
            <div className="flex gap-[24px] grow-0 mt-6 flex-wrap">
              <SkillsChipsBlue label={'Illustrator'} />
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="mt-[36px] flex justify-end md:justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap"></div>
          <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
            <div>
              <Button
                showArrowIcon={false}
                label="Delete"
                isDelete
                onClick={() => setIsDeleteModalOpen(true)}
                isLoading={isLoading}
                isDisabled={isLoading}
                onlyShowLoaderWhenLoading={true}
              />
            </div>
            <div>
              <OutlinedButton
                label="Edit"
                style={{ paddingLeft: '25px', paddingRight: '25px' }}
                onClick={() => navigate(`${PATHS.PATH_ADD_CAREER}/${item?.id}`, { replace: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        title="Delete Career"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        primaryButtonTitle="Delete"
        primaryButtonAction={() => deleteCareer()}
        secondaryButtonTitle="Cancel"
        secondaryButtonAction={() => setIsDeleteModalOpen(false)}
        isPrimaryButtonDisabled={isLoading}
      >
        Are you sure you want to delete this Career?
      </ConfirmationModal>
    </>
  );
}
