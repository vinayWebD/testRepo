/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { successStatus } from '../../common';
import Accordion from '../../components/Accordion';
import { SkillsChips, SkillsChipsBlue } from '../../components/Chips';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { BookIcon } from '../../components/Icons/BookIcon';
import { CertificateIcon } from '../../components/Icons/CertificateIcon';
import EditBlueIcon from '../../components/Icons/EditBlueIcon';
import { ExperienceIcon } from '../../components/Icons/ExperienceIcon';
import LinksIcon from '../../components/Icons/LinksIcon';
import { MediaIcon } from '../../components/Icons/MediaIcon';
import SkillsIcon from '../../components/Icons/SkillsIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import {
  fetchCareerAddLinks,
  fetchCareerAddSkills,
  fetchCareerLinkslist,
  fetchCareerSkillslist,
  fetchCareerTitle,
  fetchUpdateCareer,
} from '../../services/signup';
import {
  validationSchemaTitle,
  validationSchemaWorkLinks,
  validationSchemaWorkSkills,
} from '../../validations';
import { CertificateContent } from './CertificateContent';
import { EducationContent } from './EducationContent';
import { ExperienceContent } from './ExperienceContent';
import { MediaContent } from './MediaContent';
import check from '../../assets/images/check.png';
import cross from '../../assets/images/cross.png';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

export function CareerFrom({
  getCareerList = () => { },
  id = null, data = {},
  updateCareerId = () => { },
  type = ''
}) {
  const ref = useRef();
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [careerId, setCareerId] = useState(id);
  const [linksList, setLinksList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(id ? true : false)
  const [prevTitle, setPrevTitle] = useState(id ? data?.title : '')
  // const dispatch = useDispatch()
  const { HOME } = PATHS;

  console.log('careerId', careerId)
  // localStorage.setItem('token', 'Token 1eefa8172665f86fb7b36c6a4afd61876d8ce9ce');

  const careerSubmit = async () => {
    // we will call this api in case only when there is no career id
    //  because of we are calling this function onblur

    if (!careerId) {
      let dataToSend = {
        title: title,
      };
      const response = await fetchCareerTitle(dataToSend);
      const {
        status,
        data,
      } = response;
      console.log('response', response)
      if (successStatus(status)) {
        updateCareerId(data?.data?.id)
        setCareerId(data?.data?.id);
        setIsEdit(true)
        getCareerList();
      }
    } else {
      let dataToUpdate = {
        postData: {
          title: title,
        },
        id: careerId,
      };
      const response = await fetchUpdateCareer(dataToUpdate);
      const { status } = response;
      if (successStatus(status)) {
        getCareerList();
        setIsEdit(true)
      }
    }
  };

  const initialCareer = {
    title: data?.title || '',
  };

  const formik = useFormik({
    initialValues: initialCareer,
    validationSchema: validationSchemaTitle,
    onSubmit: careerSubmit,
  });

  const {
    values: { title },
    touched: { title: tuc_title },
    errors: { title: err_title },
    handleChange,
    handleSubmit,
  } = formik;


  const getLinksList = async () => {
    const response = await fetchCareerLinkslist(careerId);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setLinksList(results);
    }
  };

  const getSkillsList = async () => {
    const response = await fetchCareerSkillslist(careerId);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setSkillsList(results);
    }
  };

  useEffect(() => {
    // getSkillsList();
    // getLinksList();
  }, [careerId]);

  const initialLink = {
    domain: '',
    url: '',
  };

  const linksSubmit = async () => {
    let dataToSend = {
      postData: {
        domain: formikLinks.values.domain,
        url: formikLinks.values.url,
      },
      id: careerId,
    };
    const response = await fetchCareerAddLinks(dataToSend);
    const { status } = response;
    if (successStatus(status)) {
      getLinksList();
    }
  };
  const formikLinks = useFormik({
    initialValues: initialLink,
    validationSchema: validationSchemaWorkLinks,
    onSubmit: linksSubmit,
  });

  const {
    values: { domain = '', url = '' },
    touched: { domain: tuc_domain, url: tuc_url },
    errors: { domain: err_domain, url: err_url },
  } = formikLinks;

  const initialSkill = {
    name: '',
  };

  const skillsSubmit = async () => {
    let dataToSend = {
      postData: {
        name: formikSkills.values.name,
      },
      id: careerId,
    };
    const response = await fetchCareerAddSkills(dataToSend);
    const { status } = response;
    if (successStatus(status)) {
      getSkillsList();
    }
  };

  const formikSkills = useFormik({
    initialValues: initialSkill,
    validationSchema: validationSchemaWorkSkills,
    onSubmit: skillsSubmit,
  });

  const {
    values: { name = '' },
    touched: { domain: tuc_name },
    errors: { domain: err_name },
  } = formikSkills;

  console.log('title', title, prevTitle)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex block items-center mt-8 mb-5">
          <div
            className={`w-[170px] form-title  ${tuc_title && err_title ? 'pb-2 md:pb-[25px]' : 'md:pb-0 pb-2'
              } `}
          >
            Career Title
          </div>
          <div className={`grow ${tuc_title && err_title ? 'des-title-error' : 'des-title'} `}>
            <div>
              <TextArea
                name="title"
                width="w-full md:w-[500px]"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => {
                  formik.setFieldValue('title', e.target.value)
                }
                }
                disabled={isEdit}
                error={tuc_title && err_title}
                helperText={tuc_title && err_title}
              />
            </div>
            {
              !isEdit ? <>
                <button type="submit">
                  <img
                    src={check}
                    alt="check"
                    style={{ marginLeft: '20px', cursor: 'pointer' }}
                  />
                </button>
                <img
                  src={cross}
                  alt="cross"
                  style={{ marginLeft: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsEdit(true)
                    formik.setFieldValue('title', prevTitle)
                  }}
                />
              </> :
                <span style={{ marginLeft: '20px' }} onClick={() => setIsEdit(false)}>
                  <EditBlueIcon />
                </span>
            }

          </div>
        </div>
      </form>
      <div>
        <Accordion
          // disabled={!careerId}
          items={[
            {
              icon: <MediaIcon />,
              title: 'Media',
              content: <MediaContent mediaRef={ref} />,
            },

            {
              icon: <ExperienceIcon />,
              title: 'Experience',
              content: <ExperienceContent careerId={careerId} />,
            },
            {
              icon: <BookIcon />,
              title: 'Education',
              content: <EducationContent careerId={careerId} />,
            },

            {
              icon: <CertificateIcon />,
              title: 'Certifications',
              content: <CertificateContent mediaRef={ref} careerId={careerId} />,
            },
          ]}
        />
        {linksList.length > 0 && (
          <div className="w-full text-left py-[17px] px-[24px] bg-white mb-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <LinksIcon />
                </span>
                <span className="form-title-blue">Links</span>
              </div>
              <span onClick={() => setIsLinksModalOpen(true)}>
                <EditBlueIcon />
              </span>
            </div>
            <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
              {linksList.map((links, idx) => (
                <div key={idx}>
                  <div className="detail-label">{links.domain}</div>
                  <div className="detail-heading">{links.url}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {skillsList.length > 0 && (
          <div className="w-full text-left py-[17px] px-[24px] bg-white mb-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <SkillsIcon />
                </span>
                <span className="form-title-blue">Skills</span>
              </div>
              <span onClick={() => setIsSkillModalOpen(true)}>
                <EditBlueIcon />
              </span>
            </div>
            <div className="flex gap-[24px] grow-0 mt-6 flex-wrap">
              {skillsList &&
                skillsList.map(({ name }, idx) => <SkillsChipsBlue label={name} key={idx} />)}
            </div>
          </div>
        )}

        <div className="mt-[36px] flex justify-end md:justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <div>
              <OutlinedButton
                label="Add Links"
                Icon={<AddBlueIcon />}
                onClick={() => setIsLinksModalOpen(true)}
              />
            </div>
            <div>
              <OutlinedButton
                label="Add Skills"
                Icon={<AddBlueIcon />}
                onClick={() => setIsSkillModalOpen(true)}
              />
            </div>
          </div>
          {
            !id && <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
              <div>
                <OutlinedButton
                  label="Skip"
                  isSkip={true}
                  onClick={() => navigate(HOME, { replace: true })}
                />
              </div>
              <div>
                <OutlinedButton
                  label="Next"
                  style={{ paddingLeft: '25px', paddingRight: '25px' }}
                />
                {/* <Button type="submit" label="Save" showArrowIcon={false} /> */}
              </div>
            </div>
          }
          {
            type === 'add' && <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
              <div>
                <OutlinedButton
                  label="Skip"
                  isSkip={true}
                  onClick={() => navigate(HOME, { replace: true })}
                />
              </div>
              <div>
                <Button type="submit" label="Save" showArrowIcon={false} />
              </div>
            </div>
          }

        </div>
      </div>

      <Modal
        isTitle={true}
        title="Add Links"
        // isOpen={careerId && isLinksModalOpen}
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox
                name="domain"
                label="Domain"
                placeholder="Enter Domain"
                value={domain}
                onChange={(e) => formikLinks.setFieldValue('domain', e.target.value)}
                error={tuc_domain && err_domain}
                helperText={tuc_domain && err_domain}
              />
            </div>
            <div className="pb-4">
              <InputBox
                name="url"
                label="URL"
                placeholder="https://"
                value={url}
                onChange={(e) => formikLinks.setFieldValue('url', e.target.value)}
                error={tuc_url && err_url}
                helperText={tuc_url && err_url}
              />
            </div>
            <div className="grid justify-items-end pb-4">
              <OutlinedButton label="Add New" onClick={linksSubmit} showArrowIcon={false} />
            </div>
          </div>

          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button label="Save" showArrowIcon={false} onClick={linksSubmit} />
          </div>
        </>
      </Modal>
      <Modal
        isTitle={true}
        title="Add Skills"
        // isOpen={careerId && isSkillModalOpen}
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox
                name="name"
                label="Skill"
                placeholder="Enter Skill"
                value={name}
                onChange={(e) => formikSkills.setFieldValue('name', e.target.value)}
                error={tuc_name && err_name}
                helperText={tuc_name && err_name}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    skillsSubmit();
                  }
                }}
              />
            </div>
            <div className="flex gap-[12px] flex-wrap pb-[24px]">
              {skillsList?.map((title, idx) => (
                <SkillsChips key={idx} label={title.name} />
              ))}
            </div>
          </div>

          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button
              disabled={!title}
              label="Save"
              onClick={() => skillsSubmit()}
              showArrowIcon={false}
            />
          </div>
        </>
      </Modal>
    </>
  );
}
