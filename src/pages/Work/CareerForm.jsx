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
import { useDispatch } from 'react-redux';
import { updateSignup } from '../../redux/slices/authSlice';

const { HOME } = PATHS;

export function CareerForm({
  getCareerList = () => {},
  id = null,
  data = {},
  updateCareerId = () => {},
  type = '',
}) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [linksList, setLinksList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(id ? false : true);
  const [prevTitle, setPrevTitle] = useState(id ? data?.title : '');

  useEffect(() => {
    if (id) {
      setPrevTitle(data?.title);
    } else {
      setIsEdit(true);
    }
  }, [id, data]);

  const careerSubmit = async () => {
    // we will call this api in case only when there is no career id
    //  because of we are calling this function onblur

    if (!id) {
      let dataToSend = {
        title: title,
      };
      const response = await fetchCareerTitle(dataToSend);
      const { status, data } = response;

      if (successStatus(status)) {
        updateCareerId(data?.data?.id);
        setIsEdit(false);
        getCareerList();
      }
    } else {
      let dataToUpdate = {
        postData: {
          title: title,
        },
        id,
      };
      const response = await fetchUpdateCareer(dataToUpdate);
      const { status } = response;
      if (successStatus(status)) {
        getCareerList();
        setIsEdit(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: prevTitle,
    },
    validationSchema: validationSchemaTitle,
    onSubmit: careerSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!isEdit) {
      formik?.resetForm();
    }
  }, [isEdit]);

  const {
    values: { title },
    touched: { title: tuc_title },
    errors: { title: err_title },
    handleSubmit,
  } = formik;

  const getLinksList = async () => {
    const response = await fetchCareerLinkslist(id);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setLinksList(results);
    }
  };

  const getSkillsList = async () => {
    const response = await fetchCareerSkillslist(id);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setSkillsList(results);
    }
  };

  useEffect(() => {
    getSkillsList();
    getLinksList();
  }, [id]);

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
      id: id,
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
      id,
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

  const onSkipHandler = async () => {
    await dispatch(updateSignup(false));
    navigate(HOME, { replace: true });
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-[5%] items-center mt-8">
          <div className={'form-title mb-0 md:mb-[22px]'}>Career Title</div>
          <div className={'grow des-title justify-between md:justify-normal'}>
            <InputBox
              name="title"
              parentClassName="w-full md:w-[400px]"
              placeholder="Enter Title"
              value={title}
              initialValue={title}
              onChange={(e) => {
                formik.setFieldValue('title', e.target.value);
              }}
              disabled={!isEdit}
              error={tuc_title && err_title}
              helperText={tuc_title && err_title}
            />

            {isEdit ? (
              <div className="mb-[22px] flex">
                <button type="submit">
                  <img src={check} alt="check" style={{ marginLeft: '20px', cursor: 'pointer' }} />
                </button>
                <img
                  src={cross}
                  alt="cross"
                  style={{ marginLeft: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsEdit(false);
                    formik.setFieldValue('title', prevTitle);
                  }}
                />
              </div>
            ) : (
              <span className="md:ml-[20px] mb-[22px]" onClick={() => setIsEdit(true)}>
                <EditBlueIcon />
              </span>
            )}
          </div>
        </div>
        <p className="font-normal text-greydark mb-5 mt-2">
          Your information will be grouped and displayed by career field. It helps people quickly
          identify your many talents.
        </p>
      </form>
      <div>
        <Accordion
          disabled={!id}
          parentClassName={!id ? 'cursor-not-allowed opacity-60' : ''}
          items={[
            {
              icon: <MediaIcon />,
              title: 'Media',
              content: <MediaContent mediaRef={ref} />,
            },

            {
              icon: <ExperienceIcon />,
              title: 'Experience',
              content: <ExperienceContent careerId={id} />,
            },
            {
              icon: <BookIcon />,
              title: 'Education',
              content: <EducationContent careerId={id} />,
            },

            {
              icon: <CertificateIcon />,
              title: 'Certifications',
              content: <CertificateContent mediaRef={ref} careerId={id} />,
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
          {!id && (
            <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
              <div>
                <OutlinedButton label="Skip" isSkip={true} onClick={() => onSkipHandler()} />
              </div>
              <div>
                <OutlinedButton
                  label="Next"
                  style={{ paddingLeft: '25px', paddingRight: '25px' }}
                />
                {/* <Button type="submit" label="Save" showArrowIcon={false} /> */}
              </div>
            </div>
          )}
          {type === 'add' && (
            <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
              <div>
                <OutlinedButton label="Skip" isSkip={true} onClick={() => onSkipHandler()} />
              </div>
              <div>
                <Button type="submit" label="Save" showArrowIcon={false} />
              </div>
            </div>
          )}
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
