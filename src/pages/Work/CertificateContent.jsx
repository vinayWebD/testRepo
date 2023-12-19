import { useFormik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getErrorMessage, successStatus } from '../../common';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { UploadIcon } from '../../components/Icons/UploadIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import {
  addCertificate,
  deleteCertificate,
  fetchCareerCertificateList,
  fetchCertificateById,
  fetchFileUPloadAWS,
  fetchGenratePreSignedUrl,
  updateCertificate,
} from '../../services/signup';
import { validationSchemaCertificate } from '../../validations';
import { LIMITS, POST_IMAGE_TYPES } from '../../constants/constants';
import { getFileExtension, getFileName } from '../../utils/helper';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import DocumentPdfIcon from '../../components/Icons/DocumentPdfIcon';
import CrossIcon from '../../components/Icons/Cross';
import SpinningLoader from '../../components/common/SpinningLoader';
import CertificateData from '../../components/common/Work/CertificateData';
import moment from 'moment';

const initialValues = {
  title: '',
  year: '',
  institution: '',
};

export function CertificateContent({ careerId }) {
  const mediaInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificatesList, setCertificatesList] = useState([]);
  const [media, setMedia] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState({
    api: false,
    global: true,
    media: false,
  });

  const openModal = async (certificate = null) => {
    setIsModalOpen(true);

    if (certificate?.id) {
      setIsLoading({ ...isLoading, api: true });

      const response = await fetchCertificateById(certificate?.id);
      const { status, data = {} } = response;
      setIsLoading({ ...isLoading, api: false });

      if (successStatus(status)) {
        certificate = data?.data;
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
    }

    setEditId(certificate?.id);

    formik.setValues({
      title: certificate?.title || '',
      year: certificate?.year || null,
      institution: certificate?.institution || '',
    });

    setMedia(certificate?.path || null);
  };

  const getCertificatesList = async () => {
    setIsLoading({ ...isLoading, global: true });
    const response = await fetchCareerCertificateList(careerId);
    const { status, data } = response;

    if (successStatus(status)) {
      setCertificatesList(data?.data);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsLoading({ ...isLoading, global: false });
  };

  useEffect(() => {
    getCertificatesList();
  }, []);

  // Funtion to submit the certificate form
  const certificateSubmit = async (values) => {
    setIsLoading({ ...isLoading, api: true });

    const { title, year, institution } = values;

    let dataToSend = {
      title: title?.trim(),
      year,
      institution,
      path: media,
      id: editId || careerId,
    };
    let response;
    if (editId) {
      response = await updateCertificate(dataToSend);
    } else {
      response = await addCertificate(dataToSend);
    }

    const { status, data } = response;

    if (successStatus(status)) {
      setIsModalOpen(false);
      getCertificatesList();
      formik.resetForm();
      setMedia(null);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsLoading({ ...isLoading, api: false });
  };

  const uploadMedia = async () => {
    setIsLoading({ ...isLoading, media: true });

    const file = mediaInput?.current?.files?.[0];

    if (file?.size > LIMITS.POST_MAX_CERTIFICATION_SIZE_IN_BYTES) {
      ToastNotifyError('Max upload size of image/pdf is 10MB', '', false);

      setIsLoading({ ...isLoading, media: false });
      return;
    }

    // Upload the files on AWS
    await uploadFilesOnAWS(file);
  };

  useEffect(() => {
    if (isModalOpen && !editId) {
      formik?.resetForm();
      setMedia(null);
    }
  }, [isModalOpen]);

  /**
   * This function shall upload all the files to AWS
   * @param {*} fileToUpload
   */
  const uploadFilesOnAWS = async (fileToUpload) => {
    const response = await fetchGenratePreSignedUrl(getFileExtension(fileToUpload?.name), 'career');
    const { status = 0, data = {} } = response;
    if (successStatus(status)) {
      const { url, key } = data?.data || {};
      try {
        await fetchFileUPloadAWS({ url, selectedFile: fileToUpload });
        setMedia(key);
      } catch (error) {
        ToastNotifyError('Upload failed for a file');
      }
    }
    setIsLoading({ ...isLoading, media: false });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaCertificate,
    onSubmit: certificateSubmit,
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    handleChange,
    initialValues: { title = '', year = '', institution = '' } = {},
    touched: { title: tuc_title, year: tuc_year, institution: tuc_institution },
    errors: { title: err_title, year: err_year, institution: err_institution },
  } = formik;

  const handleDeleteCertificate = async () => {
    setIsLoading({ ...isLoading, api: true });
    const { status, data } = await deleteCertificate(editId);

    if (successStatus(status)) {
      formik.resetForm();
      setMedia(null);
      await getCertificatesList();
      setIsModalOpen(false);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsLoading({ ...isLoading, api: false });
  };

  const showMediaUploadButton = (isFullWidth = false) => {
    if (isLoading?.media) {
      return (
        <div
          className={`rounded-md h-[50px] ${
            isFullWidth ? 'w-full' : 'w-[268.3px]'
          }  bg-whitelight p-3 flex items-center justify-center`}
        >
          <SpinningLoader />
        </div>
      );
    }

    if (media) {
      return (
        <div
          className={`rounded-md h-[50px] ${
            isFullWidth ? 'w-full' : 'w-[268.3px]'
          } bg-whitelight p-3 flex items-center justify-between`}
          title={getFileName(media)}
        >
          <div className="w-[85%] flex">
            <div className="w-[14%]">
              <DocumentPdfIcon />
            </div>

            <p className="text-blueprimary w-[86%] text-ellipsis overflow-hidden whitespace-nowrap">
              {getFileName(media)}
            </p>
          </div>
          <div
            className="w-[15%] cursor-pointer hover:opacity-70 flex justify-end"
            onClick={() => setMedia(null)}
          >
            <CrossIcon fill="#A1A0A0" />
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="py-[16px] col-span-1 border-dashed border border-customGray rounded-lg cursor-pointer"
          onClick={() => mediaInput.current.click()}
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
            multiple={false}
            ref={mediaInput}
            type="file"
            onInput={() => uploadMedia()}
            accept={[...POST_IMAGE_TYPES, 'application/pdf', 'application/vnd.ms-excel']}
            onClick={(e) => {
              e.target.value = null;
            }} // We are setting this to null because we want to be able to select the same file simultaneously
          />
        </div>
      );
    }
  };

  if (isLoading?.global) {
    return (
      <div className="flex items-center justify-center h-[100px]">
        <SpinningLoader />
      </div>
    );
  }

  const renderEducationList = () => {
    if (certificatesList.length) {
      return certificatesList.map((data, idx) => (
        <Fragment key={idx}>
          <CertificateData data={data} openModalHandler={openModal} isEditable={true} />
        </Fragment>
      ));
    }
  };

  if (certificatesList.length) {
    return (
      <Fragment>
        {renderEducationList()}
        <div className="justify-end flex pb-[24px]">
          <OutlinedButton
            Icon={<AddBlueIcon />}
            label="Add Certification"
            onClick={() => setIsModalOpen(true)}
          />

          <Modal
            isTitle={true}
            title={editId ? 'Edit Certification' : 'Add Certification'}
            isOpen={isModalOpen}
            onClose={() => {
              setEditId(null);
              setIsModalOpen(false);
            }}
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
                    value={formik?.values?.title}
                    initialValue={formik?.values?.title}
                    onChange={handleChange}
                    error={tuc_title && err_title}
                    helperText={tuc_title && err_title}
                    maxLength={LIMITS.MAX_CAREER_STRINGS_LENGTH}
                    className="h-[50px]"
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="institution"
                    label="Institution"
                    placeholder="Enter Institution"
                    value={formik?.values?.institution}
                    initialValue={formik?.values?.institution}
                    onChange={handleChange}
                    error={tuc_institution && err_institution}
                    helperText={tuc_institution && err_institution}
                    maxLength={LIMITS.MAX_CAREER_STRINGS_LENGTH}
                    className="h-[50px]"
                  />
                </div>
                <div className="pb-6">
                  <InputBox
                    name="year"
                    type="date"
                    label="Year"
                    value={moment(formik?.values?.year).format('YYYY-MM-DD')}
                    initialValue={moment(formik?.values?.year).format('YYYY-MM-DD')}
                    onChange={handleChange}
                    error={tuc_year && err_year}
                    helperText={tuc_year && err_year}
                    className="h-[50px]"
                  />
                </div>

                <div className="grid gap-4 pb-4">
                  <div>
                    <label style={{ color: '#333' }}>Upload Media</label>
                    {showMediaUploadButton(true)}
                  </div>
                </div>
              </div>
              <div className="bg-greymedium h-[1px] w-full" />

              <div className={`flex  pt-6 pb-5 px-6 ${editId ? 'justify-between' : 'justify-end'}`}>
                {editId ? (
                  <OutlinedButton
                    isDelete={true}
                    label="Delete"
                    onClick={handleDeleteCertificate}
                    isLoading={isLoading?.api}
                    disabled={isLoading?.api || isLoading?.media}
                  />
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
        </div>
      </Fragment>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <InputBox
          name="title"
          label="Title"
          placeholder="Enter Title"
          value={title}
          onChange={handleChange}
          error={tuc_title && err_title}
          helperText={tuc_title && err_title}
          maxLength={LIMITS.MAX_CAREER_STRINGS_LENGTH}
          className="h-[50px]"
        />
        <InputBox
          name="institution"
          label="Institution"
          placeholder="Enter Institution"
          value={institution}
          onChange={handleChange}
          error={tuc_institution && err_institution}
          helperText={tuc_institution && err_institution}
          maxLength={LIMITS.MAX_CAREER_STRINGS_LENGTH}
          className="h-[50px]"
        />
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="col-span-1">
            <InputBox
              name="year"
              type="date"
              label="Year"
              value={year}
              onChange={handleChange}
              error={tuc_year && err_year}
              helperText={tuc_year && err_year}
              className="h-[50px]"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
        <div>
          <label style={{ color: '#333' }}>Upload Media</label>
          {showMediaUploadButton(false)}
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-2 pb-6"></div>
      <div className="bg-greymedium h-[1px] w-full mt-4" />
      <div className="justify-end flex pb-6 pt-6">
        <OutlinedButton
          label="Save"
          onClick={handleSubmit}
          isLoading={isLoading?.api}
          disabled={isLoading?.api || isLoading?.media}
        />
      </div>
    </form>
  );
}
