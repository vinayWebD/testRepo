/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { SkillsChipsBlue } from '../../components/Chips';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
// import {
//   fetchCareerLinkslist,
//   fetchCareerSkillslist,
// } from '../../services/signup';
import { useNavigate } from 'react-router-dom';
import dummy from '../../assets/images/dummy.svg';
import { fetchCareersList } from '../../services/signup';
import { useDispatch } from 'react-redux';
import { deleteWorkDispatcher } from '../../redux/dispatchers/infoDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { useState } from 'react';

export function CareerDetail({ data: item, }) {
  // const [careerId, setCareerId] = useState(id);
  // const [linksList, setLinksList] = useState([]);
  // const [skillsList, setSkillsList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  console.log('item', item)
  const deleteCareer = async () => {
    const response = await dispatch(deleteWorkDispatcher({ id: item?.id }));
    const {
      status,
      data,
    } = response;
    console.log('response', response)
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      await window.location.reload()
    }
  };




  // const getLinksList = async () => {
  //   const response = await fetchCareerLinkslist(careerId);
  //   const {
  //     status,
  //     data: { results = [] },
  //   } = response;
  //   if (successStatus(status)) {
  //     setLinksList(results);
  //   }
  // };

  // const getSkillsList = async () => {
  //   const response = await fetchCareerSkillslist(careerId);
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
      <div className='pb-5'>
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
        <div className="w-full text-left py-[17px] px-[24px] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="form-title-blue">Experience</span>
            </div>
          </div>
          <div>
            <div className="pr-[64px] flex justify-between relative pt-4">
              <div className="pb-[24px]">
                <div className="detail-label">Title</div>
                <div className="detail-heading">Intern</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Company</div>
                <div className="detail-heading">Xebia</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Start Date</div>
                <div className="detail-heading">Nov 21, 2020</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label"> End Date</div>
                <div className="detail-heading">Jan 21, 2021</div>
              </div>
            </div>
            <div>
              <div className="detail-label">Description</div>
              <div className="detail-heading">I collaborated with cross-functional teams to conceptualize and create visual assets that aligned with the brand's aesthetic. I contributed to the design and refinement of user interfaces, ensuring an intuitive and seamless user experience. I assisted in the development of marketing materials, such as social media graphics and promotional banners, maintaining consistency in messaging and design elements.</div>
            </div>
            <div className="pt-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
        </div>
        <div className="w-full text-left py-[17px] px-[24px] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="form-title-blue">Education</span>
            </div>
          </div>
          <div>
            <div className="pr-[64px] flex justify-between relative pt-4">
              <div className="pb-[24px]">
                <div className="detail-label">School/College/University</div>
                <div className="detail-heading">CCHS</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Field of Study</div>
                <div className="detail-heading">Science</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Start Date</div>
                <div className="detail-heading">2008</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">End date or expected</div>
                <div className="detail-heading">2014</div>
              </div>
            </div>
            <div className="pr-[64px] flex justify-between relative pt-4">
              <div className="pb-[24px]">
                <div className="detail-label">Degree</div>
                <div className="detail-heading">B.Tech</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Other (Activities, clubs, organizations and societies)</div>
                <div className="detail-heading">Nil</div>
              </div>
              <div className="pb-[24px]">

              </div>
              <div className="pb-[24px]">

              </div>
            </div>
            <div className="pt-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
        </div>
        <div className="w-full text-left py-[17px] px-[24px] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="form-title-blue">Certifications</span>
            </div>
          </div>
          <div>
            <div className="pr-[64px] flex justify-between relative pt-4">
              <div className="pb-[24px]">
                <div className="detail-label">Title</div>
                <div className="detail-heading">Design Thinking</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Institution</div>
                <div className="detail-heading">Xebia</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Year</div>
                <div className="detail-heading">2021</div>
              </div>
            </div>
            <div>
              <div className="detail-label">Media</div>
              <div className="detail-heading">elements</div>
            </div>
            <div className="pt-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
        </div>
        <div className="w-full text-left py-[17px] px-[24px] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="form-title-blue">Links</span>
            </div>
          </div>
          <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
            <div>
              <div className="detail-label">Faxquote</div>
              <div className="text-[14px]" style={{ color: '#3366CC', fontWeight: '400' }}>http://www.faxquote.com</div>
            </div>
          </div>
        </div>
        <div className="w-full text-left py-[17px] px-[24px] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="form-title-blue">Skills</span>
            </div>
          </div>
          <div className="flex gap-[24px] grow-0 mt-6 flex-wrap">
            <SkillsChipsBlue label={'Illustrator'} />
          </div>
        </div>

        <div className="mt-[36px] flex justify-end md:justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap">
          </div>
          <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
            <div>
              <Button
                label="Delete"
                isDelete
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </div>
            <div>
              <OutlinedButton
                label="Edit"
                style={{ paddingLeft: '25px', paddingRight: '25px' }}
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
      >
        Are you sure you want to delete this Career?
      </ConfirmationModal>
    </>
  );
}
