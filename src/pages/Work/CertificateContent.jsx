import { useFormik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { successStatus } from '../../common';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { UploadIcon } from '../../components/Icons/UploadIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import { fetchCareerCertificate, fetchCareerCertificateList } from '../../services/signup';
import { validationSchemaCertificate } from '../../validations';

export function CertificateContent({ mediaRef, handleFileEvent, careerId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certifacresList, setcertifacresList] = useState([]);

  const getcertifacressList = async () => {
    const response = await fetchCareerCertificateList(careerId);
    const {
      status,
      data: { results = [] },
    } = response;
    if (successStatus(status)) {
      setcertifacresList(results);
    }
  };

  useEffect(() => {
    getcertifacressList();
  }, []);

  const certificateSubmit = async (values) => {
    const { title, year, institution } = values;

    let dataToSend = {
      data: {
        title: title,
        year: year,
        institution: institution,
      },
      id: careerId,
    };
    const response = await fetchCareerCertificate(dataToSend);
    const { status } = response;
    if (successStatus(status)) {
      setIsModalOpen(false);
      getcertifacressList();
      formik.resetForm();
    }
  };

  const initialValues = {
    title: '',
    year: '',
    institution: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaCertificate,
    onSubmit: certificateSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    initialValues: { title = '', year = '', institution = '' } = {},
    touched: { title: tuc_title, year: tuc_year, institution: tuc_institution },
    errors: { title: err_title, year: err_year, institution: err_institution },
  } = formik;

  const renderEducationList = () => {
    if (certifacresList.length) {
      return certifacresList.map((data, idx) => (
        <Fragment key={idx}>
          <div>
            <div className="pr-[48px] flex justify-between">
              <div className="pb-[24px] ">
                <div className="detail-label">Title</div>
                <div className="detail-heading">{data.title}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Institution</div>
                <div className="detail-heading">{data?.institution}</div>
              </div>
              <div className="pb-[24px]">
                <div className="detail-label">Year</div>
                <div className="detail-heading">{data?.year}</div>
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
                    label="Title"
                    placeholder="Enter Title"
                    value={title}
                    onChange={handleChange}
                    error={tuc_title && err_title}
                    helperText={tuc_title && err_title}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    label="Institution"
                    placeholder="Enter Institution"
                    value={institution}
                    onChange={handleChange}
                    error={tuc_institution && err_institution}
                    helperText={tuc_institution && err_institution}
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="year"
                    type="date"
                    label="Year"
                    value={year}
                    onChange={handleChange}
                    error={tuc_year && err_year}
                    helperText={tuc_year && err_year}
                  />
                </div>
                <div className="grid gap-4 pb-4">
                  <div>
                    <label style={{ color: '#333' }}>Upload Media</label>
                    <div
                      className="py-[16px] col-span-1 border-dashed border border-customGray rounded-lg cursor-pointer"
                      onClick={() => mediaRef.current.click()}
                      label="Attach Document"
                    >
                      <div className="flex items-center justify-center">
                        <span className="mr-2">
                          <UploadIcon fill="#A1A0A0" />
                        </span>
                        <span className="upload-btn-gray bg-customGray">Upload jpg/pdf</span>
                      </div>
                      <input
                        className="hidden"
                        id="attach-document"
                        multiple
                        ref={mediaRef}
                        type="file"
                        onChange={handleFileEvent}
                      />
                    </div>
                  </div>
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

  if (certifacresList.length) {
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
    <form onSubmit={handleSubmit}>
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
          name="institution"
          label="Institution"
          placeholder="Enter Institution"
          value={institution}
          onChange={handleChange}
          error={tuc_institution && err_institution}
          helperText={tuc_institution && err_institution}
        />
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InputBox
              name="year"
              type="date"
              label="Year"
              value={year}
              onChange={handleChange}
              error={tuc_year && err_year}
              helperText={tuc_year && err_year}
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2 pb-6">
        <div>
          <label style={{ color: '#333' }}>Upload Media</label>
          <div
            className="py-[16px] col-span-1 border-dashed border border-customGray rounded-lg cursor-pointer"
            onClick={() => mediaRef.current.click()}
            label="Attach Document"
          >
            <div className="flex items-center justify-center">
              <span className="mr-2">
                <UploadIcon fill="#A1A0A0" />
              </span>
              <span className="upload-btn-gray bg-customGray">Upload jpg/pdf</span>
            </div>
            <input
              className="hidden"
              id="attach-document"
              multiple
              ref={mediaRef}
              type="file"
              onChange={handleFileEvent}
            />
          </div>
        </div>
      </div>
      <div className="justify-end flex  pb-6">
        <OutlinedButton label="save" onClick={handleSubmit} />
      </div>
    </form>
  );
}
