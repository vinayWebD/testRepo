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
import { fetchCareerExperience, fetchCareerExperienceList } from '../../services/signup';
import { successStatus } from '../../common';

import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';

export function ExperienceContent({ careerId = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);

  const getExperiencesList = async () => {
    const response = await fetchCareerExperienceList(careerId);
    const {
      status,
      data: { results = [] },
      data = {},
    } = response;
    console.log(results, 'results');
    console.log(data, 'results');
    if (successStatus(status)) {
      setExperienceList(results);
    }
  };

  useEffect(() => {
    getExperiencesList();
  }, []);

  const experienceSubmit = async (values) => {
    const { title, description, start_date, company } = values;
    let dataToSend = {
      data: {
        title: title,
        description: description,
        start_date: start_date,
        company: company,
      },
      id: careerId,
    };
    const response = await fetchCareerExperience(dataToSend);
    const { status } = response;
    if (successStatus(status)) {
      getExperiencesList();
    }
  };

  const initialValues = {
    title: '',
    description: '',
    start_date: '',
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
    initialValues: { title = '', description, company = '', start_date = '' } = {},
    touched: {
      title: tuc_title,
      description: tuc_description,
      company: tuc_company,
      start_date: tuc_start_date,
    },
    errors: {
      title: err_title,
      description: err_description,
      company: err_company,
      start_date: err_start_date,
    },
  } = formik;

  useEffect(() => {}, [experienceList]);

  const renderExperienceList = () => {
    if (experienceList.length) {
      return experienceList.map((data, idx) => (
        <Fragment key={idx}>
          <div>
            <div className="pr-[48px] flex justify-between">
              <div className="pb-[24px]">
                <div className="detail-label">Title</div>
                <div className="detail-heading">{data.title}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Company</div>
                <div className="detail-heading">{data.company}</div>
              </div>
              <div className="flex justify-between gap-[36px]">
                <div className="pb-[24px]">
                  <div className="detail-label">Start Date</div>
                  <div className="detail-heading">{moment(data?.start_date).format('ll')}</div>
                </div>
                <div className="pb-[24px]">
                  <div className="detail-label"> End Date</div>
                  <div className="detail-heading">{moment(data?.end_date).format('ll')}</div>
                </div>
              </div>
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
            title="Edit Education"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            width="max-w-[472px]"
            padding={0}
          >
            <>
              <div className="px-6">
                <div className="pb-6">
                  <InputBox
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
                    type="date"
                    label="Start Date"
                    placeholder="Select Date"
                    value={start_date}
                    onChange={handleChange}
                    error={tuc_start_date && err_start_date}
                    helperText={tuc_start_date && err_start_date}
                  />
                  <InputBox
                    type="date"
                    label="End Date"
                    placeholder="Select Date"
                    value={start_date}
                    onChange={handleChange}
                    error={tuc_start_date && err_start_date}
                    helperText={tuc_start_date && err_start_date}
                  />
                </div>
                <div className="flex gap-[12px] items-center mb-6">
                  <Checkbox />
                  <span className="para-checkbox">I am currently working on this role.</span>
                </div>
                <div className="mb-4">
                  <TextArea
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
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name={'startDate'}
            type="date"
            label="Start Date"
            placeholder="Select Date"
            value={start_date}
            onChange={(e) => formik.setFieldValue('start_date', e.target.value)}
            error={tuc_start_date && err_start_date}
            helperText={tuc_start_date && err_start_date}
          />
          <InputBox
            name={'endDate'}
            type="date"
            label="End Date"
            placeholder="Select Date"
            value={start_date}
            onChange={handleChange}
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
      <div className="flex items-center justify-between pb-[45px]">
        <div className="flex gap-[24px] ">
          <Checkbox /> <span>I am currently working on this role.</span>
        </div>
        <OutlinedButton label="save" onClick={handleSubmit} type="button" />
      </div>
    </>
  );
}
