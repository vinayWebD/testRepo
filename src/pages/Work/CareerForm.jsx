import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { getErrorMessage, successStatus } from '../../common';
import Accordion from '../../components/Accordion';
import { SkillsChipsBlue } from '../../components/Chips';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { BookIcon } from '../../components/Icons/BookIcon';
import { CertificateIcon } from '../../components/Icons/CertificateIcon';
import EditBlueIcon from '../../components/Icons/EditBlueIcon';
import { ExperienceIcon } from '../../components/Icons/ExperienceIcon';
import { MediaIcon } from '../../components/Icons/MediaIcon';
import SkillsIcon from '../../components/Icons/SkillsIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';

import {
  addCareerLinks,
  fetchCareerLinkslist,
  fetchCareerSkillslist,
  updateCareerSkills,
} from '../../services/signup';
import { validationSchemaTitle } from '../../validations';
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
import {
  addCareerTitleDispatcher,
  updateCareerTitleDispatcher,
} from '../../redux/dispatchers/signupDispatcher';
import SpinningLoader from '../../components/common/SpinningLoader';
import { LIMITS, REGEX } from '../../constants/constants';
import LinkForm from './LinkForm';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { LinkData } from '../../components/common/Work/LinkData';
import LinksIcon from '../../components/Icons/LinksIcon';
import SkillForm from './SkillForm';

const { HOME } = PATHS;
const { LINK_PATTERN } = REGEX;

export function CareerForm({
  getCareerList = () => {},
  id = null,
  data = {},
  type = '',
  fetchCareerDataById = () => {},
}) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [linkInInput, setLinkInInput] = useState({
    url: '',
    domain: '',
  });

  const [skillsList, setSkillsList] = useState([]);
  const [skillsFromAPI, setSkillsFromAPI] = useState([]);

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(id ? false : true);
  const [prevTitle, setPrevTitle] = useState(id ? data?.title : '');
  const [isLoading, setIsLoading] = useState({ title: false, links: false, skills: false });

  useEffect(() => {
    if (id) {
      setPrevTitle(data?.title);
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [id, data]);

  const openLinksModalHandler = () => {
    setLinkInInput({ url: '', domain: '' });
    setIsLinksModalOpen(true);
  };

  const careerTitleHandler = async () => {
    if (!isLoading?.title) {
      setIsLoading({ ...isLoading, title: true });

      if (!id) {
        // we will call this api in case only when there is no career id
        //  because of we are calling this function onblur
        let dataToSend = {
          title,
        };
        const response = await dispatch(addCareerTitleDispatcher(dataToSend));
        const { status, data } = response;

        if (successStatus(status)) {
          fetchCareerDataById(data?.data?.id);
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
        const response = await dispatch(updateCareerTitleDispatcher(dataToUpdate));
        const { status } = response;
        if (successStatus(status)) {
          getCareerList();
          setIsEdit(false);
        }
      }
      setIsLoading({ ...isLoading, title: false });
    }
  };

  const formik = useFormik({
    initialValues: {
      title: prevTitle,
    },
    validationSchema: validationSchemaTitle,
    onSubmit: careerTitleHandler,
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
    const { status, data } = response;
    if (successStatus(status)) {
      setLinks(data?.data || []);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg, '');
      }
    }
  };

  const getSkillsList = async () => {
    const response = await fetchCareerSkillslist(id);
    const { status, data } = response;
    if (successStatus(status)) {
      let skills = data?.data?.map((skill) => skill?.skill);
      setSkillsList(skills);
      setSkillsFromAPI(skills);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg, '');
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSkillsList();
      getLinksList();
    }
  }, [id]);

  const linksSubmit = async () => {
    if (isLoading?.links) return;
    setIsLoading({ ...isLoading, links: true });

    let link = {
      url: linkInInput?.url?.trim(),
      domain: linkInInput?.domain?.trim(),
    };
    let allLinks = [...links];

    // If there is anything typed in the input box and the plus button is not clicked, so we need to check
    // if there is some value in it and if it's valid
    if (link?.url || link?.domain) {
      if (!link?.url.startsWith('https://')) {
        link['url'] = `https://${link?.url}`;
      }

      if (!LINK_PATTERN.test(link?.url)) {
        ToastNotifyError('Invalid URL', '');
        setIsLoading({ ...isLoading, links: false });
        return false;
      } else if (!link?.domain) {
        ToastNotifyError('Domain is required', '');
        setIsLoading({ ...isLoading, links: false });
        return false;
      } else {
        allLinks = [link, ...allLinks];
      }
    }

    const response = await addCareerLinks({
      careerId: id,
      links: allLinks,
    });
    const { status } = response;
    if (successStatus(status)) {
      getLinksList();

      setIsLoading({ ...isLoading, links: false });
      setIsLinksModalOpen(false);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg, 'location-failed');
      }
    }
  };

  const skillsSubmit = async () => {
    if (isLoading?.skills) return;
    setIsLoading({ ...isLoading, skills: true });

    const response = await updateCareerSkills(skillsList || [], id);
    const { status } = response;
    if (successStatus(status)) {
      getSkillsList();
      setIsSkillModalOpen(false);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg, 'location-failed');
      }
    }
    setIsLoading({ ...isLoading, skills: false });
  };

  const onSkipHandler = async () => {
    await dispatch(updateSignup(false));
    navigate(HOME, { replace: true });
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-[5%] items-center mt-8">
          <div className={'form-title mb-2 md:mb-[22px]'}>Career Title</div>
          <div className={'grow des-title gap-4 md:justify-normal'}>
            <InputBox
              name="title"
              parentClassName="w-[245px] md:w-[400px]"
              placeholder="Enter Title"
              value={title}
              initialValue={title}
              onChange={(e) => {
                formik.setFieldValue('title', e.target.value);
              }}
              disabled={!isEdit}
              error={tuc_title && err_title}
              helperText={tuc_title && err_title}
              maxLength={LIMITS.MAX_CAREER_TITLE_LENGTH}
            />

            {isEdit ? (
              <div className="mb-[22px] flex">
                {!isLoading?.title ? (
                  <>
                    <button type="submit">
                      <img src={check} alt="check" className="ml-0 md:ml-[20px] cursor-pointer" />
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
                  </>
                ) : (
                  <SpinningLoader marginLeft="ml-0 md:ml-[20px]" />
                )}
              </div>
            ) : (
              <span
                className="md:ml-[20px] mb-[22px] cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
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
              content: <CertificateContent careerId={id} />,
            },
          ]}
        />
        {links.length > 0 && (
          <div className="w-full text-left py-[17px] px-[24px] bg-white mb-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <LinksIcon />
                </span>
                <span className="form-title-blue">Links</span>
              </div>
              <span onClick={openLinksModalHandler} className="cursor-pointer">
                <EditBlueIcon />
              </span>
            </div>
            <div className="text-[12px] font-medium mt-2 mb-3">
              ({links.length}/5 Links Uploaded)
            </div>
            <LinkData openModalHandler={openLinksModalHandler} data={links} isEditable={true} />
          </div>
        )}

        {skillsFromAPI.length > 0 && (
          <div className="w-full text-left py-[17px] px-[24px] bg-white mb-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <SkillsIcon />
                </span>
                <span className="form-title-blue">Skills</span>
              </div>
              <span onClick={() => setIsSkillModalOpen(true)} className="cursor-pointer">
                <EditBlueIcon />
              </span>
            </div>
            <div className="flex gap-[24px] grow-0 mt-6 flex-wrap">
              {skillsFromAPI?.map((name, idx) => (
                <SkillsChipsBlue label={name} key={idx} />
              ))}
            </div>
          </div>
        )}
        <div className="mt-[36px] flex justify-end md:justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <div>
              <OutlinedButton
                label="Add Links"
                Icon={<AddBlueIcon />}
                onClick={openLinksModalHandler}
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
          {!id && type !== 'add' && (
            <div className="flex gap-4 flex-wrap items-center md:mt-[0px] mt-[36px]">
              <div>
                <OutlinedButton label="Skip" isSkip={true} onClick={() => onSkipHandler()} />
              </div>
              <div>
                <OutlinedButton
                  label="Next"
                  style={{ paddingLeft: '25px', paddingRight: '25px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isTitle={true}
        title="Add Links"
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
        titleClassNames="pl-0"
      >
        <div className="px-6">
          <LinkForm
            links={links}
            setLinks={setLinks}
            linkInInput={linkInInput}
            setLinkInInput={setLinkInInput}
            isInputLinkOpen={true}
          />

          <div className="grid justify-items-end pb-5">
            <Button
              disabled={isLoading?.links}
              label="Save"
              onClick={() => linksSubmit()}
              showArrowIcon={false}
              isLoading={isLoading?.links}
              onlyShowLoaderWhenLoading={true}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isTitle={true}
        title="Add Skills"
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
        titleClassNames="pl-0"
      >
        <>
          <SkillForm skillsList={skillsList} updateSkillsList={setSkillsList} />

          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button
              disabled={!title}
              label="Save"
              onClick={() => skillsSubmit()}
              showArrowIcon={false}
              isLoading={isLoading?.skills}
              isDisabled={isLoading?.skills}
              onlyShowLoaderWhenLoading={true}
            />
          </div>
        </>
      </Modal>
    </>
  );
}
