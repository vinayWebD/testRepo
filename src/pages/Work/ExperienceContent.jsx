import { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import Checkbox from '../../components/Checkbox';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import { validationSchemaExperience } from '../../validations';
import {
  deleteExperience,
  fetchCareerExperienceList,
  fetchExperienceById,
  updateExperience,
} from '../../services/signup';
import { getErrorMessage, successStatus } from '../../common';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { useDispatch } from 'react-redux';
import { addExperienceDispatcher } from '../../redux/dispatchers/signupDispatcher';
import SpinningLoader from '../../components/common/SpinningLoader';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { ExperienceData } from '../../components/common/Work/ExperienceData';

const initialValues = {
  title: '',
  description: '',
  startDate: null,
  endDate: null,
  company: '',
};

export function ExperienceContent({ careerId = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [volunteerCheck, setVolunteerCheck] = useState(false);
  const [isLoading, setIsLoading] = useState({
    global: true,
    api: false,
  });
  const dispatch = useDispatch();

  const getExperiences = async () => {
    setIsLoading({ ...isLoading, global: true });
    const response = await fetchCareerExperienceList(careerId);
    const { status, data = {} } = response;
    if (successStatus(status)) {
      setExperiences(data?.data);
    }
    setIsLoading({ ...isLoading, global: false });
  };

  useEffect(() => {
    setIsModalOpen(false);
    setVolunteerCheck(false);
    getExperiences();
  }, []);

  useEffect(() => {
    if (isModalOpen && !editId) {
      formik?.resetForm();
      setIsCurrentlyWorking(false);
      setVolunteerCheck(false);
    }
  }, [isModalOpen]);

  const openModal = async (experience = null) => {
    setIsModalOpen(true);

    if (experience?.id) {
      setIsLoading({ ...isLoading, api: true });
      const response = await fetchExperienceById({ id: experience?.id });
      setIsLoading({ ...isLoading, api: false });
      if (successStatus(response?.status)) {
        experience = response?.data?.data;
      }
    }
    setEditId(experience?.id || null);

    formik.setValues({
      title: experience?.title || '',
      description: experience?.description || '',
      startDate: experience?.startDate ? moment(experience?.startDate).format('YYYY-MM-DD') : '',
      endDate: experience?.endDate ? moment(experience?.endDate).format('YYYY-MM-DD') : '',
      company: experience?.company || '',
    });

    setIsCurrentlyWorking(experience?.isCurrentlyWorking);
    setVolunteerCheck(experience?.isVolunteerExperience);
  };

  const experienceSubmit = async (values) => {
    if (isLoading?.api) {
      return;
    }
    setIsLoading({ ...isLoading, api: true });
    const { title, description, startDate, company, endDate } = values;

    let dataToSend = {
      title: title?.trim(),
      description,
      startDate,
      endDate,
      company,
      isVolunteerExperience: volunteerCheck,
      isCurrentlyWorking,
    };

    let response;
    if (editId) {
      response = await updateExperience({
        experienceId: editId,
        ...dataToSend,
      });
    } else {
      response = await dispatch(addExperienceDispatcher({ ...dataToSend, careerId }));
    }
    const { status, data } = response;

    setIsLoading({ ...isLoading, api: false });

    if (successStatus(status)) {
      formik.resetForm();
      setIsCurrentlyWorking(false);
      await getExperiences();
      setIsModalOpen(false);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaExperience,
    onSubmit: experienceSubmit,
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    handleChange,
    touched: {
      title: tuc_title,
      description: tuc_description,
      company: tuc_company,
      startDate: tuc_start_date,
      endDate: tuc_end_date,
    },
    errors: {
      title: err_title,
      description: err_description,
      company: err_company,
      startDate: err_start_date,
      endDate: err_end_date,
    },
  } = formik;

  if (isLoading?.global) {
    return (
      <div className="flex items-center justify-center h-[100px]">
        <SpinningLoader />
      </div>
    );
  }

  const renderExperienceList = () => {
    if (experiences.length) {
      return experiences.map((data, idx) => (
        <Fragment key={idx}>
          <ExperienceData data={data} openModalHandler={openModal} />
        </Fragment>
      ));
    }
  };

  const handleDeleteExperience = async () => {
    const { status } = await deleteExperience({
      id: editId,
    });

    if (successStatus(status)) {
      formik.resetForm();
      setIsCurrentlyWorking(false);
      await getExperiences();
      setIsModalOpen(false);
    }
  };

  if (experiences.length) {
    return (
      <Fragment>
        {renderExperienceList()}
        <div className="justify-end flex pb-[24px]">
          <OutlinedButton Icon={<AddBlueIcon />} label="Add Experience" onClick={openModal} />
        </div>
        <Modal
          isTitle={true}
          title={editId ? 'Edit Experience' : 'Add Experience'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          width="max-w-[472px]"
          padding={0}
          titleClassNames="pl-0"
        >
          <div className="relative">
            {isLoading?.api ? (
              <div className="absolute top-0 left-0 flex items-center h-full w-full bg-[#ffffffa1] justify-center mt-[-95px]">
                <SpinningLoader />
              </div>
            ) : (
              ''
            )}
            <div className="px-6">
              <div className="pb-6">
                <InputBox
                  name="title"
                  label="Title"
                  placeholder="Enter Title"
                  className="h-[50px]"
                  value={formik?.values?.title}
                  initialValue={formik?.values?.title}
                  onChange={handleChange}
                  error={tuc_title && err_title}
                  helperText={tuc_title && err_title}
                />
              </div>
              <div className="pb-6">
                <InputBox
                  name="company"
                  label="Company Name"
                  placeholder="Enter Company Name"
                  value={formik?.values?.company}
                  initialValue={formik?.values?.company}
                  onChange={handleChange}
                  error={tuc_company && err_company}
                  helperText={tuc_company && err_company}
                  className="h-[50px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pb-4">
                <InputBox
                  name="startDate"
                  type="date"
                  label="Start Date"
                  placeholder="Select Date"
                  value={formik?.values?.startDate}
                  initialValue={formik?.values?.startDate}
                  onChange={handleChange}
                  error={tuc_start_date && err_start_date}
                  helperText={tuc_start_date && err_start_date}
                  className="h-[50px]"
                />

                <InputBox
                  disabled={isCurrentlyWorking} // Disable the input box when currentCheck is true
                  name={'endDate'}
                  type="date"
                  label="End Date"
                  placeholder="Select Date"
                  value={isCurrentlyWorking ? '' : formik?.values?.endDate} // Show empty string if currentCheck is true
                  initialValue={isCurrentlyWorking ? '' : formik?.values?.endDate}
                  onChange={(e) => formik.setFieldValue('endDate', e.target.value)}
                  error={tuc_end_date && err_end_date}
                  helperText={tuc_end_date && err_end_date}
                  className="h-[50px]"
                />
              </div>
              <div className="flex gap-[12px] items-center mb-6">
                <Checkbox
                  checked={isCurrentlyWorking}
                  setChecked={(value) => {
                    setIsCurrentlyWorking(value);
                    if (value) {
                      formik.setFieldValue('endDate', null); // Set endDate to null
                    } else {
                      formik.setFieldValue('endDate', ''); // Reset endDate
                    }
                  }}
                />
                <span className="para-checkbox">I am currently working on this role.</span>
              </div>
              <div className="flex gap-[12px] items-center mb-6">
                <Checkbox
                  checked={volunteerCheck}
                  setChecked={(value) => setVolunteerCheck(value)}
                />
                <span className="para-checkbox">This is a volunteer experience.</span>
              </div>
              <div className="mb-4">
                <TextArea
                  name="description"
                  label="Description"
                  height="h-[100px] max:h-[230px]"
                  placeholder="Enter Description"
                  defaultValue={formik?.values?.description}
                  onChange={handleChange}
                  error={tuc_description && err_description}
                  helperText={tuc_description && err_description}
                />
              </div>
            </div>
            <div className="bg-greymedium h-[1px] w-full" />
            <div className={`flex  pt-6 pb-5 px-6 ${editId ? 'justify-between' : 'justify-end'}`}>
              {editId ? (
                <OutlinedButton isDelete={true} label="Delete" onClick={handleDeleteExperience} />
              ) : (
                ''
              )}

              <Button
                label="Save"
                showArrowIcon={false}
                onClick={handleSubmit}
                type="button"
                isLoading={isLoading?.api}
                onlyShowLoaderWhenLoading={true}
              />
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <InputBox
          name="title"
          label="Title"
          placeholder="Enter Title"
          value={formik?.values?.title}
          onChange={handleChange}
          error={tuc_title && err_title}
          helperText={tuc_title && err_title}
          className="h-[50px]"
        />
        <InputBox
          name="company"
          label="Company Name"
          placeholder="Enter Company Name"
          value={formik?.values?.company}
          onChange={handleChange}
          error={tuc_company && err_company}
          helperText={tuc_company && err_company}
          className="h-[50px]"
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <InputBox
            name={'startDate'}
            type="date"
            label="Start Date"
            placeholder="Select Date"
            value={formik?.values?.startDate}
            onChange={(e) => formik.setFieldValue('startDate', e.target.value)}
            error={tuc_start_date && err_start_date}
            helperText={tuc_start_date && err_start_date}
            className="h-[50px]"
          />
          <InputBox
            disabled={isCurrentlyWorking} // Disable the input box when currentCheck is true
            name={'endDate'}
            type="date"
            label="End Date"
            placeholder="Select Date"
            value={isCurrentlyWorking ? '' : formik.values.endDate} // Show empty string if currentCheck is true
            onChange={(e) => formik.setFieldValue('endDate', e.target.value)}
            error={tuc_end_date && err_end_date}
            helperText={tuc_end_date && err_end_date}
            className="h-[50px]"
          />
        </div>
      </div>
      <div className="mt-6 mb-[42px]">
        <TextArea
          name="description"
          label="Description"
          height="h-[50px]"
          placeholder="Enter Description"
          defaultValue={formik?.values?.description}
          onChange={handleChange}
          error={tuc_description && err_description}
          helperText={tuc_description && err_description}
          className="h-[50px]"
        />
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end justify-between pb-[45px]">
        <div className="flex">
          <div className="flex md:gap-[10px] gap-[3px] text-[12px] md:text-[16px] md:pb-0 pb-6">
            <Checkbox
              checked={isCurrentlyWorking}
              setChecked={(value) => {
                setIsCurrentlyWorking(value);
                if (value) {
                  formik.setFieldValue('endDate', null); // Set endDate to null
                } else {
                  formik.setFieldValue('endDate', ''); // Reset endDate
                }
              }}
            />{' '}
            <span>I am currently working on this role.</span>
          </div>
          <div className="flex md:gap-[10px] gap-[3px] text-[12px] md:text-[16px] md:pb-0 pb-6 ml-6">
            <Checkbox checked={volunteerCheck} setChecked={(value) => setVolunteerCheck(value)} />{' '}
            <span>This is a volunteer experience.</span>
          </div>
        </div>
        <OutlinedButton
          label="Save"
          onClick={handleSubmit}
          type="button"
          isLoading={isLoading?.api}
          onlyShowLoaderWhenLoading={true}
        />
      </div>
    </>
  );
}
