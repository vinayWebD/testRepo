import React, { useEffect, useState } from 'react';
import InputProfilePicture from './InputProfilePicture';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MESSAGES } from '../constants/messages';
import { REGEX } from '../constants/constants';
import { Button } from './common/Button';
import InputBox from './InputBox';
import { fetchFileUPloadAWS, fetchGenratePreSignedUrl, fetchProfileEdit } from '../services/signup';
import { getErrorMessage, successStatus } from '../common';
import { ToastNotifyError, ToastNotifySuccess } from './Toast/ToastNotify';
import { getFileExtension } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { profileDispatcher } from '../redux/dispatchers/authDispatcher';

const { IS_REQUIRED, EMAIL_INVALID, MSG_FIELD_LENGTH } = MESSAGES;
const { EMAIL_PATTERN } = REGEX;

const EditProfile = ({
  firstName = '',
  lastName = '',
  email = '',
  location = '',
  profilePictureUrl = '',
  profilePicture = '',
  onClose = () => {},
}) => {
  const [cropImageFile, setCropImageFile] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName,
    lastName,
    email,
    location,
    profilePicture,
  };

  const validationSchema = yup.object({
    email: yup.string().matches(EMAIL_PATTERN, EMAIL_INVALID).required(IS_REQUIRED('Email')),
    firstName: yup
      .string()
      .required(IS_REQUIRED('First Name'))
      .max(50, MSG_FIELD_LENGTH('First Name')),
    lastName: yup
      .string()
      .required(IS_REQUIRED('Last Name'))
      .max(50, MSG_FIELD_LENGTH('First Name')),
    location: yup.string(),
    profilePicture: yup.string(),
  });

  const getPreSignedUrl = async () => {
    setIsLoading(true);
    if (cropImageFile) {
      const response = await fetchGenratePreSignedUrl(
        getFileExtension(cropImageFile?.name),
        'profilePicture',
      );
      const { status = 0, data = {} } = response;
      if (successStatus(status)) {
        const {
          data: { url, key },
        } = data;
        formik.setFieldValue('profilePicture', key);
        await fetchFileUPloadAWS({ url: url, selectedFile: cropImageFile });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPreSignedUrl();
  }, [cropImageFile]);

  const onSubmit = async (values) => {
    if (!isLoading) {
      setIsLoading(true);
      const { firstName = '', lastName = '', location = '', profilePicture = '' } = values;
      const response = await fetchProfileEdit({
        firstName,
        lastName,
        location,
        profilePicture,
      });
      const { status, data } = response;
      const errormsg = getErrorMessage(data);
      if (successStatus(status)) {
        ToastNotifySuccess('Profile updated successfully', 'location-success');
        dispatch(profileDispatcher());
        onClose();
      } else {
        if (errormsg) {
          ToastNotifyError(errormsg, 'location-failed');
        }
      }
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="flex justify-center items-center mt-4 flex-col gap-[12px]"
    >
      <div className="border border-greymedium rounded-full">
        <InputProfilePicture
          setCropImageFile={setCropImageFile}
          cropImageFile={cropImageFile}
          profilePic={profilePictureUrl}
          width="!w-[100px]"
          height="!h-[100px]"
        />
      </div>

      <div className="w-full flex items-center justify-center gap-6 px-[18px]">
        <InputBox
          name="firstName"
          type="text"
          label={'First Name'}
          placeholder={'Enter First Name'}
          initialValue={formik?.values?.firstName}
          onChange={formik.handleChange}
          labelFontColor={'#333333'}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          isRequired
          className="w-full"
          parentClassName="w-full lg:w-[50%]"
        />
        <InputBox
          name="lastName"
          type="text"
          label={'Last Name'}
          placeholder={'Enter Last Name'}
          initialValue={formik?.values?.lastName}
          onChange={formik.handleChange}
          labelFontColor={'#333333'}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          isRequired
          className="w-full"
          parentClassName="w-full lg:w-[50%]"
        />
      </div>
      <div className="w-full px-[18px]">
        <InputBox
          name="email"
          type="email"
          label={'Email address'}
          placeholder={'Enter Email adress'}
          initialValue={formik?.values?.email}
          onChange={formik.handleChange}
          labelFontColor={'#333333'}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          isRequired
          className="w-full"
          disabled={true}
        />
      </div>
      <div className="w-full px-[18px]">
        <InputBox
          name="location"
          type="text"
          label={'Location'}
          placeholder={'Enter Location'}
          initialValue={formik?.values?.location}
          onChange={formik.handleChange}
          labelFontColor={'#333333'}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          isRequired
          className="w-full"
        />
      </div>
      <div className="border-greymedium border-t w-full flex justify-end py-5 px-[18px]">
        <Button
          type="submit"
          label="Save"
          additionalClassNames="capitalize"
          isLoading={isLoading}
          showArrowIcon={false}
          isDisabled={isLoading}
        />
      </div>
    </form>
  );
};

export default EditProfile;
