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
import { fetchCareerEducation, fetchCareerEducationList } from '../../services/signup';
import { validationSchemaEducation } from '../../validations';

export function EducationContent({ careerId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);

  const getEducationsList = async () => {
    const response = await fetchCareerEducationList(careerId);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setEducationList(results);
    }
  };

  useEffect(() => {
    getEducationsList();
  }, []);

  const educationSubmit = async (values) => {
    const { school, degree, start_date, end_date, field_of_study, other } = values;

    let dataToSend = {
      data: {
        school: school,
        degree: degree,
        start_date: start_date,
        end_date: end_date,
        field_of_study: field_of_study,
        other: other,
      },
      id: careerId,
    };
    const response = await fetchCareerEducation(dataToSend);
    const { status } = response;
    if (successStatus(status)) {
      formik.resetForm();
      getEducationsList();
      setIsModalOpen(false);
    }
  };

  const initialValues = {
    school: '',
    degree: '',
    start_date: '',
    end_date: '',
    field_of_study: '',
    other: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaEducation,
    onSubmit: educationSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    initialValues: {
      school = '',
      degree = '',
      start_date = '',
      end_date = '',
      field_of_study = '',
      other = '',
    } = {},
    touched: {
      school: tuc_school,
      degree: tuc_degree,
      field_of_study: tuc_field_of_study,
      start_date: tuc_start_date,
      end_date: tuc_end_date,
      other: tuc_other,
    },
    errors: {
      school: err_school,
      degree: err_degree,
      field_of_study: err_field_of_study,
      start_date: err_start_date,
      end_date: err_end_date,
      other: err_other,
    },
  } = formik;

  const renderEducationList = () => {
    if (educationList.length) {
      return educationList.map((data, idx) => (
        <Fragment key={idx}>
          <div>
            <div className="pr-[48px] flex justify-between">
              <div className="pb-[24px] ">
                <div className="detail-label">School/College/University</div>
                <div className="detail-heading">{data.school}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Field of Study</div>
                <div className="detail-heading">{data?.field_of_study}</div>
              </div>
              <div className="flex justify-between">
                <div className="pb-[24px]">
                  <div className="detail-label">Start Date</div>
                  <div className="detail-heading">{moment(data?.start_date).format('ll')}</div>
                </div>
                <div className="pb-[24px]">
                  <div className="detail-label"> End date or expected</div>
                  <div className="detail-heading">{moment(data?.end_date).format('ll')}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="pb-[24px]">
                <div className="detail-label"> Degree</div>
                <div className="detail-heading">{data?.degree}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">
                  Other (Activities, clubs, organizations and societies)
                </div>
                <div className="detail-heading">{data?.other}</div>
              </div>
              <div></div>
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
                    name="school"
                    label="School/College/University"
                    placeholder="Enter School Name"
                    value={school}
                    onChange={handleChange}
                    error={tuc_school && err_school}
                    helperText={tuc_school && err_school}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="degree"
                    label="Degree"
                    placeholder="Enter Degree"
                    value={degree}
                    onChange={handleChange}
                    error={tuc_degree && err_degree}
                    helperText={tuc_degree && err_degree}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="field_of_study"
                    label="Field of Study"
                    placeholder="Enter Field of Study"
                    value={field_of_study}
                    onChange={handleChange}
                    error={tuc_field_of_study && err_field_of_study}
                    helperText={tuc_field_of_study && err_field_of_study}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <InputBox
                    name="start_date"
                    type="date"
                    label="Start Date"
                    placeholder="Select Date"
                    value={start_date}
                    onChange={handleChange}
                    error={tuc_start_date && err_start_date}
                    helperText={tuc_start_date && err_start_date}
                  />
                  <InputBox
                    name="end_date"
                    type="date"
                    label="End date or expected"
                    placeholder="Select Year"
                    value={end_date}
                    onChange={handleChange}
                    error={tuc_end_date && err_end_date}
                    helperText={tuc_end_date && err_end_date}
                  />
                </div>
                <div className="mb-4">
                  <TextArea
                    name="other"
                    height="h-[135px]"
                    label="Other (Activities, clubs, organizations and societies)"
                    placeholder="Enter here"
                    defaultValue={other}
                    onChange={handleChange}
                    error={tuc_other && err_other}
                    helperText={tuc_other && err_other}
                  />
                </div>
              </div>
              <div className="bg-greymedium h-[1px] w-full" />
              <div className="grid justify-items-end pt-6 pb-5 px-6">
                <Button label="Save" showArrowIcon={false} onClick={handleSubmit} />
              </div>
            </>
          </Modal>
        </Fragment>
      ));
    }
  };

  if (educationList.length) {
    return (
      <Fragment>
        {renderEducationList()}
        <div className="justify-end flex pb-[24px]">
          <OutlinedButton
            Icon={<AddBlueIcon />}
            label="Add Other"
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
          name="school"
          label="School/College/University"
          placeholder="Enter School Name"
          value={school}
          onChange={handleChange}
          error={tuc_school && err_school}
          helperText={tuc_school && err_school}
        />
        <InputBox
          name="degree"
          label="Degree"
          placeholder="Enter Degree"
          value={degree}
          onChange={handleChange}
          error={tuc_degree && err_degree}
          helperText={tuc_degree && err_degree}
        />
        <InputBox
          name="field_of_study"
          label="Field of Study"
          placeholder="Enter Field of Study"
          value={field_of_study}
          onChange={handleChange}
          error={tuc_field_of_study && err_field_of_study}
          helperText={tuc_field_of_study && err_field_of_study}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pb-6">
        <div className="md:col-span-1 col-span-3 ">
          <div className="grid grid-cols-2 gap-4">
            <InputBox
              name="start_date"
              type="date"
              label="Start Date"
              placeholder="Select Date"
              value={start_date}
              onChange={handleChange}
              error={tuc_start_date && err_start_date}
              helperText={tuc_start_date && err_start_date}
            />
            <InputBox
              name="end_date"
              type="date"
              label="End date or expected"
              placeholder="Select Year"
              value={end_date}
              onChange={handleChange}
              error={tuc_end_date && err_end_date}
              helperText={tuc_end_date && err_end_date}
            />
          </div>
        </div>
        <div className="md:col-span-2 col-span-3">
          <TextArea
            name="other"
            height="h-[48px]"
            label="Other (Activities, clubs, organizations and societies)"
            placeholder="Enter here"
            defaultValue={other}
            onChange={handleChange}
            error={tuc_other && err_other}
            helperText={tuc_other && err_other}
          />
        </div>
      </div>
      <div className="justify-end flex  pb-6">
        <OutlinedButton label="save" onClick={handleSubmit} />
      </div>
    </>
  );
}
