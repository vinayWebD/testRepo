/* eslint-disable no-unused-vars */
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
  fetchCareerExperience,
  fetchCareerExperienceList,
  fetchExperienceSingle,
  fetchUpdateExperience,
} from '../../services/signup';
import { successStatus } from '../../common';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import EditBlueIcon from '../../components/Icons/EditBlueIcon';

export function ExperienceContent({ careerId = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentCheck, setCurrentCheck] = useState(false);
  const [volunteerCheck, setVolunteerCheck] = useState(false);
  console.log('careerId--->', careerId);
  const getExperiences = async () => {
    const response = await fetchExperienceSingle(careerId);
    const { status, data = {} } = response;
    if (successStatus(status)) {
      console.log(data);
    }
  };

  const getExperiencesList = async () => {
    const response = await fetchCareerExperienceList(careerId);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setExperienceList(results);
    }
  };

  useEffect(() => {
    getExperiences();
  }, [editId]);

  useEffect(() => {
    // getExperiencesList();
  }, []);

  const experienceSubmit = async (values) => {
    const { title, description, startDate, company, endDate } = values;
    let dataToSend = {
      data: {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        company: company,
        isVolunteerExperience: volunteerCheck,
      },
      id: editId ? editId : careerId,
    };
    let response;
    if (editId) {
      response = await fetchUpdateExperience(careerId);
    } else {
      response = await fetchCareerExperience(dataToSend);
    }
    const { status } = response;
    if (successStatus(status)) {
      formik.resetForm();
      getExperiencesList();
    }
  };

  const initialValues = {
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    company: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaExperience,
    onSubmit: experienceSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    initialValues: { title = '', description, company = '', startDate = null, endDate = null } = {},
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

  useEffect(() => {}, [experienceList]);

  console.log('---->Formik', formik.values);

  const renderExperienceList = () => {
    if (experienceList.length) {
      return experienceList.map((data, idx) => (
        <Fragment key={idx}>
          <div>
            <div className="pr-[64px] flex justify-between relative">
              <div className="pb-[24px]">
                <div className="detail-label">Title</div>
                <div className="detail-heading">{data.title}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Company</div>
                <div className="detail-heading">{data.company}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Start Date</div>
                <div className="detail-heading">{moment(data?.startDate).format('ll')}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label"> End Date</div>
                <div className="detail-heading">{moment(data?.endDate).format('ll')}</div>
              </div>
              <span
                className="absolute right-[0] top-[50%] cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                  setEditId(data?.experience_id);
                }}
              >
                <EditBlueIcon />
              </span>
            </div>

            <div>
              <div className="detail-label">Description</div>
              <div className="detail-heading">{data.description}</div>
            </div>
            <div className="py-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
          <Modal
            isTitle={true}
            title={editId ? 'Edit Experience' : 'Edit Experience'}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            width="max-w-[472px]"
            padding={0}
          >
            <>
              <div className="px-6">
                <div className="pb-6">
                  <InputBox
                    name="title"
                    label="Title"
                    placeholder="Enter Title"
                    className
                    value={title}
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
                    value={company}
                    onChange={handleChange}
                    error={tuc_company && err_company}
                    helperText={tuc_company && err_company}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <InputBox
                    name="startDate"
                    type="date"
                    label="Start Date"
                    placeholder="Select Date"
                    value={startDate}
                    onChange={handleChange}
                    error={tuc_start_date && err_start_date}
                    helperText={tuc_start_date && err_start_date}
                  />
                  <InputBox
                    name="endDate"
                    type="date"
                    label="End Date"
                    placeholder="Select Date"
                    value={endDate}
                    onChange={(e) => formik.setFieldValue('endDate', e.target.value)}
                    error={tuc_end_date && err_end_date}
                    helperText={tuc_end_date && err_end_date}
                  />
                </div>
                <div className="flex gap-[12px] items-center mb-6">
                  <Checkbox
                    checked={currentCheck}
                    setChecked={(value) => {
                      setCurrentCheck(value);
                      if (value === true) {
                        formik.setFieldValue('endDate', startDate);
                      } else {
                        formik.setFieldValue('endDate', '');
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
                    height="h-[230px]"
                    placeholder="Enter Description"
                    defaultValue={description}
                    onChange={handleChange}
                    error={tuc_description && err_description}
                    helperText={tuc_description && err_description}
                  />
                </div>
              </div>
              <div className="bg-greymedium h-[1px] w-full" />
              <div className="flex justify-between pt-6 pb-5 px-6">
                <OutlinedButton isDelete={true} label="Delete" />
                <Button
                  label="Save"
                  showArrowIcon={false}
                  onClick={() => {
                    handleSubmit();
                    setIsModalOpen(false);
                  }}
                  type="button"
                />
              </div>
            </>
          </Modal>
        </Fragment>
      ));
    }
  };

  if (experienceList.length) {
    return (
      <Fragment>
        {renderExperienceList()}
        <div className="justify-end flex pb-[24px]">
          <OutlinedButton
            Icon={<AddBlueIcon />}
            label="Add Experience"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
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
          value={title}
          onChange={handleChange}
          error={tuc_title && err_title}
          helperText={tuc_title && err_title}
        />
        <InputBox
          name="company"
          label="Company Name"
          placeholder="Enter Company Name"
          value={company}
          onChange={handleChange}
          error={tuc_company && err_company}
          helperText={tuc_company && err_company}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <InputBox
            name={'startDate'}
            type="date"
            label="Start Date"
            placeholder="Select Date"
            value={startDate}
            onChange={(e) => formik.setFieldValue('startDate', e.target.value)}
            error={tuc_start_date && err_start_date}
            helperText={tuc_start_date && err_start_date}
          />
          <InputBox
            disabled={currentCheck}
            name={'endDate'}
            type="date"
            label="End Date"
            placeholder="Select Date"
            value={endDate}
            onChange={(e) => formik.setFieldValue('endDate', e.target.value)}
            error={tuc_end_date && err_end_date}
            helperText={tuc_end_date && err_end_date}
          />
        </div>
      </div>
      <div className="mt-6 mb-[42px]">
        <TextArea
          name="description"
          label="Description"
          height="h-[50px]"
          placeholder="Enter Description"
          defaultValue={description}
          onChange={handleChange}
          error={tuc_description && err_description}
          helperText={tuc_description && err_description}
        />
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end justify-between pb-[45px]">
        <div className="flex">
          <div className="flex md:gap-[10px] gap-[3px] text-[12px] md:text-[16px] md:pb-0 pb-6">
            <Checkbox
              checked={currentCheck}
              setChecked={(value) => {
                setCurrentCheck(value);
                console.log('value', value);
                if (value === true) {
                  formik.setFieldValue('endDate', startDate);
                } else {
                  formik.setFieldValue('endDate', null);
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
        <OutlinedButton label="save" onClick={handleSubmit} type="button" />
      </div>
    </>
  );
}
