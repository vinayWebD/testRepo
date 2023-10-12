import { useFormik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import { successStatus } from '../../common';
import Accordion from '../../components/Accordion';
import { SkillsChips, SkillsChipsBlue } from '../../components/Chips';
import BlueDivider from '../../components/common/BlueDivider';
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
  fetchCareersList,
  fetchCareerTitle,
  fetchUpdateCareer,
  fetchWorkInterest,
} from '../../services/signup';
import {
  validationSchemaTitle,
  validationSchemaWorkIntrest,
  validationSchemaWorkLinks,
  validationSchemaWorkSkills,
} from '../../validations';
import { CertificateContent } from './CertificateContent';
import { EducationContent } from './EducationContent';
import { ExperienceContent } from './ExperienceContent';
import { MediaContent } from './MediaContent';

export function WorkTabContent() {
  const ref = useRef();
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [careerId, setCareerId] = useState(null);
  const [linksList, setLinksList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [careerList, setCareerList] = useState([]);
  localStorage.setItem('token', 'Token 1eefa8172665f86fb7b36c6a4afd61876d8ce9ce');

  const getCareerList = async () => {
    const response = await fetchCareersList();
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setCareerList(results);
    }
  };

  useEffect(() => {
    getCareerList();
  }, []);

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
        data: { career_id = null },
      } = response;
      if (successStatus(status)) {
        setCareerId(career_id);
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
      }
    }
  };

  const initialCareer = {
    title: '',
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

  const initialWork = {
    work: '',
  };

  const workSubmit = async () => {
    let dataToSend = {
      work: formikWork.values.work,
      interest: '',
    };

    await fetchWorkInterest(dataToSend);
  };

  const formikWork = useFormik({
    initialValues: initialWork,
    validationSchema: validationSchemaWorkIntrest,
    onSubmit: workSubmit,
  });

  const {
    values: { work = '' },
    touched: { title: tuc_work },
    errors: { title: err_work },
  } = formikWork;

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
    getSkillsList();
    getLinksList();
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

  return (
    <div className="py-[36px] px-[70px] bg-bluebg">
      <form onSubmit={handleSubmit}>
        <div className="tab-content-title">So far so good. Let’s talk about your work</div>
        <div className="tab-content-subtitle">We use this info for better reach.</div>

        <div className="flex items-center mt-8 mb-5">
          <div className="w-[170px] form-title">About work</div>
          <div className="grow">
            <TextArea
              height="h-[160px]"
              placeholder="Enter Description"
              name="work"
              value={work}
              onChange={(e) => formikWork.setFieldValue('work', e.target.value)}
              onBlur={workSubmit}
              error={tuc_work && err_work}
              helperText={tuc_work && err_work}
            />
          </div>
        </div>
        <div className="mb-8 flex justify-between">
          <div className="step-title">
            Career
            <BlueDivider />
          </div>
          <OutlinedButton
            disabled={!careerList.length}
            label="Add Career"
            Icon={<AddBlueIcon />}
            IconDisabled={<AddBlueIcon fill="#D1D1D1" />}
          />
        </div>

        <div className="flex items-center mt-8 mb-5">
          <div className="w-[170px] form-title">Career Title</div>
          <div className="grow">
            <TextArea
              name="title"
              width="w-full md:w-[500px]"
              placeholder="Enter Title"
              value={title}
              onChange={handleChange}
              onBlur={careerSubmit}
              error={tuc_title && err_title}
              helperText={tuc_title && err_title}
            />
          </div>
        </div>

        <div>
          <Accordion
            disabled={!careerId}
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
              <div className="flex gap-[24px] grow-0 mt-6">
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
              <div className="flex gap-[24px] grow-0 mt-6">
                {skillsList &&
                  skillsList.map(({ name }, idx) => <SkillsChipsBlue label={name} key={idx} />)}
              </div>
            </div>
          )}

          <div className="mt-[36px] flex justify-between flex-wrap">
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
            <div className="flex gap-4 flex-wrap items-center">
              <div>
                <OutlinedButton label="Skip" isSkip={true} />
              </div>
              <div>
                <Button type="submit" label="Save" showArrowIcon={false} />
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal
        isTitle={true}
        title="Add Links"
        isOpen={careerId && isLinksModalOpen}
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
        isOpen={careerId && isSkillModalOpen}
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
    </div>
  );
}
