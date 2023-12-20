import { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { successStatus } from '../../common';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import {
  addEducation,
  deleteEducation,
  editEducation,
  fetchCareerEducationList,
  fetchEducationById,
} from '../../services/signup';
import { validationSchemaEducation } from '../../validations';
import EditBlueIcon from '../../components/Icons/EditBlueIcon';
import { LIMITS } from '../../constants/constants';
import SpinningLoader from '../../components/common/SpinningLoader';

const initialValues = {
  school: '',
  degree: '',
  startDate: '',
  endDate: '',
  fieldOfStudy: '',
  other: '',
};

export function EducationContent({ careerId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState({
    global: true,
    api: false,
  });

  const getEducationsList = async () => {
    setIsLoading({ ...isLoading, global: true });
    const response = await fetchCareerEducationList(careerId);
    const { status, data } = response;
    if (successStatus(status)) {
      setEducations(data?.data);
    }
    setIsLoading({ ...isLoading, global: false });
  };

  useEffect(() => {
    getEducationsList();
  }, []);

  useEffect(() => {
    if (isModalOpen && !editId) {
      formik?.resetForm();
    }
  }, [isModalOpen]);

  const openModal = async (education = null) => {
    setIsModalOpen(true);

    if (education?.id) {
      setIsLoading({ ...isLoading, api: true });
      const response = await fetchEducationById(education?.id);
      setIsLoading({ ...isLoading, api: false });
      if (successStatus(response?.status)) {
        education = response?.data?.data;
      }
    }

    setEditId(education?.id);

    formik.setValues({
      school: education?.institute || '',
      degree: education?.degree || '',
      startDate: education?.startDate ? moment(education?.startDate).format('YYYY-MM-DD') : null,
      endDate: education?.endDate ? moment(education?.endDate).format('YYYY-MM-DD') : null,
      fieldOfStudy: education?.filedOfStudy || '',
      other: education?.otherActivities || '',
    });
  };

  const educationSubmit = async (values) => {
    if (isLoading?.api) {
      return;
    }

    setIsLoading({ ...isLoading, api: true });
    const { school, degree, startDate, endDate, fieldOfStudy, other } = values;

    let dataToSend = {
      school,
      degree,
      startDate,
      endDate,
      fieldOfStudy,
      other,
      id: editId || careerId,
    };

    console.log(dataToSend);
    let response;
    if (editId) {
      response = await editEducation(dataToSend);
    } else {
      response = await addEducation(dataToSend);
    }
    const { status } = response;
    if (successStatus(status)) {
      formik.resetForm();
      getEducationsList();
      setIsModalOpen(false);
    }
    setIsLoading({ ...isLoading, api: false });
  };

  const handleDeleteEducation = async () => {
    const { status } = await deleteEducation({
      id: editId,
    });

    if (successStatus(status)) {
      formik.resetForm();
      await getEducationsList();
      setIsModalOpen(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaEducation,
    onSubmit: educationSubmit,
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    handleChange,
    initialValues: {
      school = '',
      degree = '',
      startDate = '',
      endDate = '',
      fieldOfStudy = '',
      other = '',
    } = {},
    touched: {
      school: tuc_school,
      degree: tuc_degree,
      fieldOfStudy: tuc_fieldOfStudy,
      startDate: tuc_startDate,
      endDate: tuc_endDate,
      other: tuc_other,
    },
    errors: {
      school: err_school,
      degree: err_degree,
      fieldOfStudy: err_fieldOfStudy,
      startDate: err_startDate,
      endDate: err_endDate,
      other: err_other,
    },
  } = formik;

  if (isLoading?.global) {
    return (
      <div className="flex items-center justify-center h-[100px]">
        <SpinningLoader />
      </div>
    );
  }

  const renderEducationList = () => {
    if (educations.length) {
      return educations.map((data, idx) => (
        <Fragment key={idx}>
          <div>
            <div className="md:pr-[64px] flex flex-col md:flex-row relative gap-3 break-words">
              <div className="pb-[24px] md:w-[35%] w-full">
                <div className="detail-label">School/College/University</div>
                <div className="detail-heading">{data.institute}</div>
              </div>
              <div className="pb-[24px] md:w-[35%] w-full">
                <div className="detail-label">Field of Study</div>
                <div className="detail-heading">{data?.filedOfStudy}</div>
              </div>
              <div className="pb-[24px] md:w-[15%] w-full">
                <div className="detail-label">Start Date</div>
                <div className="detail-heading">{moment(data?.startDate).format('ll')}</div>
              </div>
              <div className="pb-[24px] md:w-[15%] w-full">
                <div className="detail-label">End Date</div>
                <div className="detail-heading">{moment(data?.endDate).format('ll')}</div>
              </div>
              <span
                className="absolute right-[0] top-[50%] cursor-pointer"
                onClick={() => {
                  openModal(data);
                }}
              >
                <EditBlueIcon />
              </span>
            </div>
            <div className="md:pr-[64px] flex flex-col md:flex-row gap-3 break-words">
              <div className="pb-[24px] md:w-[35%] w-full">
                <div className="detail-label"> Degree</div>
                <div className="detail-heading">{data?.degree}</div>
              </div>
              <div className="pb-[24px] md:w-[35%] w-full">
                <div className="detail-label">
                  Other (Activities, clubs, organizations and societies)
                </div>
                <div className="detail-heading">{data?.otherActivities}</div>
              </div>
              <div className="md:pb-[24px] md:w-[15%] w-full"></div>
              <div className="md:pb-[24px] md:w-[15%] w-full"></div>
            </div>
            <div className="py-[24px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          </div>
        </Fragment>
      ));
    }
  };

  if (educations.length) {
    return (
      <Fragment>
        {renderEducationList()}
        <div className="justify-end flex pb-[24px]">
          <OutlinedButton
            Icon={<AddBlueIcon />}
            label="Add Education"
            onClick={openModal}
            isLoading={isLoading?.api}
          />
        </div>
        <Modal
          isTitle={true}
          title={editId ? 'Edit Education' : 'Add Education'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          width="max-w-[472px]"
          padding={0}
          titleClassNames="pl-0"
        >
          <>
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
                    name="school"
                    label="School/College/University"
                    placeholder="Enter School Name"
                    value={formik?.values?.school}
                    initialValue={formik?.values?.school}
                    onChange={handleChange}
                    error={tuc_school && err_school}
                    helperText={tuc_school && err_school}
                    className="h-[50px]"
                    maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="degree"
                    label="Degree"
                    placeholder="Enter Degree"
                    value={formik?.values?.degree}
                    initialValue={formik?.values?.degree}
                    onChange={handleChange}
                    error={tuc_degree && err_degree}
                    helperText={tuc_degree && err_degree}
                    className="h-[50px]"
                    maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="fieldOfStudy"
                    label="Field of Study"
                    placeholder="Enter Field of Study"
                    value={formik?.values?.fieldOfStudy}
                    initialValue={formik?.values?.fieldOfStudy}
                    onChange={handleChange}
                    error={tuc_fieldOfStudy && err_fieldOfStudy}
                    helperText={tuc_fieldOfStudy && err_fieldOfStudy}
                    className="h-[50px]"
                    maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <InputBox
                    name="startDate"
                    type="date"
                    label="Start Date"
                    placeholder="Select Date"
                    value={formik?.values?.startDate}
                    initialValue={formik?.values?.startDate}
                    onChange={handleChange}
                    error={tuc_startDate && err_startDate}
                    helperText={tuc_startDate && err_startDate}
                    className="h-[50px]"
                  />
                  <InputBox
                    name="endDate"
                    type="date"
                    label="End date or expected"
                    placeholder="Select Year"
                    value={formik?.values?.endDate}
                    initialValue={formik?.values?.endDate}
                    onChange={handleChange}
                    error={tuc_endDate && err_endDate}
                    helperText={tuc_endDate && err_endDate}
                    className="h-[50px]"
                  />
                </div>
                <div className="mb-4">
                  <TextArea
                    name="other"
                    label="Other (Activities, clubs, organizations and societies)"
                    placeholder="Enter here"
                    defaultValue={formik?.values?.other}
                    onChange={handleChange}
                    error={tuc_other && err_other}
                    helperText={tuc_other && err_other}
                    className="h-[50px]"
                    height="h-[100px] max:h-[230px]"
                    maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
                  />
                </div>
              </div>
              <div className="bg-greymedium h-[1px] w-full" />

              <div className={`flex  pt-6 pb-5 px-6 ${editId ? 'justify-between' : 'justify-end'}`}>
                {editId ? (
                  <OutlinedButton isDelete={true} label="Delete" onClick={handleDeleteEducation} />
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
          </>
        </Modal>
      </Fragment>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <InputBox
          name="school"
          label="School/College/University"
          placeholder="Enter School Name"
          value={school}
          onChange={handleChange}
          error={tuc_school && err_school}
          helperText={tuc_school && err_school}
          className="h-[50px]"
          maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
        />
        <InputBox
          name="degree"
          label="Degree"
          placeholder="Enter Degree"
          value={degree}
          onChange={handleChange}
          error={tuc_degree && err_degree}
          helperText={tuc_degree && err_degree}
          className="h-[50px]"
          maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
        />
        <InputBox
          name="fieldOfStudy"
          label="Field of Study"
          placeholder="Enter Field of Study"
          value={fieldOfStudy}
          onChange={handleChange}
          error={tuc_fieldOfStudy && err_fieldOfStudy}
          helperText={tuc_fieldOfStudy && err_fieldOfStudy}
          className="h-[50px]"
          maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
        />
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4 lg:pb-6">
        <div className="lg:col-span-1 col-span-3 ">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4">
            <InputBox
              name="startDate"
              type="date"
              label="Start Date"
              placeholder="Select Date"
              value={startDate}
              onChange={handleChange}
              error={tuc_startDate && err_startDate}
              helperText={tuc_startDate && err_startDate}
              className="h-[50px]"
            />
            <InputBox
              name="endDate"
              type="date"
              label="End date or expected"
              placeholder="Select Year"
              value={endDate}
              onChange={handleChange}
              error={tuc_endDate && err_endDate}
              helperText={tuc_endDate && err_endDate}
              className="h-[50px]"
            />
          </div>
        </div>
        <div className="lg:col-span-2 col-span-3" style={{ marginTop: '-7px' }}>
          <TextArea
            name="other"
            label="Other (Activities, clubs, organizations and societies)"
            placeholder="Enter here"
            defaultValue={other}
            onChange={handleChange}
            error={tuc_other && err_other}
            helperText={tuc_other && err_other}
            className="h-[50px]"
            maxLength={LIMITS.MAX_EDUCATION_STRINGS_LENGTH}
          />
        </div>
      </div>
      <div className="justify-end flex pb-6 pt-6">
        <OutlinedButton label="Save" onClick={handleSubmit} isLoading={isLoading?.api} />
      </div>
    </>
  );
}
