import React, { useEffect, useState } from 'react';
import InputProfilePicture from '../InputProfilePicture';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MESSAGES } from '../../constants/messages';
import { REGEX } from '../../constants/constants';
import { Button } from '../common/Button';
import InputBox from '../InputBox';
import {
  fetchFileUPloadAWS,
  fetchGenratePreSignedUrl,
  fetchProfileEdit,
} from '../../services/signup';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { getFileExtension } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { profileDispatcher } from '../../redux/dispatchers/authDispatcher';
import Modal from '../Modal';
import UpdateEmail from './UpdateEmail';
import { sendOtpToUpdateEmailDispatcher } from '../../redux/dispatchers/myProfileDispatcher';

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
  const [isVerifyEmailPopupOpen, setIsVerifyEmailPopupOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(0);

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
    location: yup.string().nullable(true),
    profilePicture: yup.string().nullable(true).optional(),
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
    console.log('sdfsdff');
    if (!isLoading) {
      setIsLoading(true);

      const { firstName = '', lastName = '', location = '', profilePicture = '' } = values;
      const response = await fetchProfileEdit({
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        location: location?.trim(),
        profilePicture: profilePicture || '',
        email: isEmailVerified === 2 ? values?.email?.trim() : email,
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

  const onVerifyClickHandler = async () => {
    if (![0, 1].includes(isEmailVerified)) {
      return;
    }

    const response = await dispatch(
      sendOtpToUpdateEmailDispatcher({
        email: formik.values.email?.trim(),
      }),
    );
    const { status, data } = response;
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
        setIsLoading(false);
      }
    } else {
      setIsVerifyEmailPopupOpen(true);
    }
    setIsEmailVerified(0);
  };

  return (
    <>
      <form noValidate className="flex justify-center items-center mt-4 flex-col gap-2">
        <div className="border border-greymedium rounded-full">
          <InputProfilePicture
            setCropImageFile={setCropImageFile}
            cropImageFile={cropImageFile}
            profilePic={profilePictureUrl}
            width="!w-[100px]"
            height="!h-[100px]"
            iconWidth="40"
            iconHeight="40"
            iconFillColor="#0171bd"
            isFromEditProfile={true}
          />
        </div>

        <div className="w-full flex items-center justify-center gap-6 px-[18px] mt-3">
          <InputBox
            name="firstName"
            type="text"
            label={'First Name'}
            placeholder={'Enter First Name'}
            initialValue={formik?.values?.firstName}
            onChange={formik.handleChange}
            labelFontColor={'#333333'}
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
            helperText={formik.touched.lastName && formik.errors.lastName}
            isRequired
            className="w-full"
            parentClassName="w-full lg:w-[50%]"
          />
        </div>
        <div className="flex items-center w-full px-[18px] relative">
          <InputBox
            name="email"
            type="email"
            label={'Email address'}
            placeholder={'Enter Email adress'}
            initialValue={formik?.values?.email}
            onChange={formik.handleChange}
            labelFontColor={'#333333'}
            helperText={formik.touched.email && formik.errors.email}
            isRequired
            disabled={isEmailVerified === 2}
            className="pr-13"
            parentClassName="w-full"
          />
          <div className="absolute right-[30px] top-[40px] text-[12px]">
            <span
              className={`text-center ${
                formik?.values?.email?.trim() !== email?.trim()
                  ? 'text-blueprimary cursor-pointer font-semibold'
                  : 'text-greydark opacity-40 cursor-not-allowed'
              } ${isEmailVerified === 2 ? '!cursor-default !text-[#0FBC00]' : ''} `}
              onClick={() => {
                if (isEmailVerified !== 2 && formik?.values?.email?.trim() !== email?.trim()) {
                  onVerifyClickHandler();
                }
              }}
            >
              {isEmailVerified === 2 ? 'Verified' : 'Verify'}
            </span>
          </div>
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
            helperText={formik.touched.location && formik.errors.location}
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
            isDisabled={
              isLoading ||
              JSON.stringify(formik?.values) ===
                JSON.stringify({ firstName, lastName, email, location, profilePicture })
            }
          />
        </div>
      </form>
      <Modal
        isOpen={isVerifyEmailPopupOpen}
        onClose={() => {
          setIsEmailVerified(0);
          setIsVerifyEmailPopupOpen(false);
        }}
        isTitle={true}
        title={'Verify Email'}
        titleClassNames=""
        padding="p-0"
      >
        <UpdateEmail
          newEmail={formik?.values?.email}
          verificationStep={isEmailVerified}
          updateVerificationStep={setIsEmailVerified}
          currentEmail={email}
          closeHandler={() => {
            setIsVerifyEmailPopupOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default EditProfile;
