import React, { useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { useFormik } from 'formik';
import { deleteAccountPwdSchema } from '../../validations/auth';
import { Button } from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import Input from '../../components/common/Input';
import { deleteAccountDispatcher } from '../../redux/dispatchers/authDispatcher';
import { updateSearch } from '../../redux/slices/appSearchSlice';
import { logout } from '../../redux/slices/authSlice';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

const { SETTINGS, LOGIN } = PATHS;

const initialValues = {
  password: '',
};

const DeleteAccount = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    const { status, data } = await dispatch(
      deleteAccountDispatcher({
        password: values?.password,
      }),
    );

    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      dispatch(updateSearch({ searchValue: '' }));
      localStorage.removeItem('token');
      dispatch(logout());
      navigate(LOGIN, { replace: true });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: deleteAccountPwdSchema,
    onSubmit,
  });

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Delete Account'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <div className="font-medium mt-3">
          Would you like to delete your PurDriven account: <br />
          <span className="text-blueprimary">
            {userData?.firstName} {userData?.lastName}
          </span>
          <p className="my-5 text-[14px]">
            Just a quick reminder, deleting your account means you’ll lose all your content,
            connections and followers.
          </p>
        </div>

        <div className="w-full flex justify-end items-center gap-5 mt-6">
          <div className="cursor-pointer text-[16px] text-greydark font-medium">Cancel</div>
          <Button
            label="Delete"
            showArrowIcon={false}
            onClick={() => {
              setIsDeleteAccountPopupOpen(true);
              formik.setValues(initialValues);
              formik.resetForm();
            }}
          />
        </div>

        <ConfirmationModal
          title={'Delete Account'}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsDeleteAccountPopupOpen(false)}
          secondaryButtonTitle="Yes"
          secondaryButtonAction={formik.handleSubmit}
          isOpen={isDeleteAccountPopupOpen}
          onClose={() => setIsDeleteAccountPopupOpen(false)}
          childrenClassNames="overflow-y-auto"
          padding="p-0"
          titleClassNames=""
          width="max-w-[460px]"
          titleParentClassNames="md:m-3 m-0"
          height=" max-h-[100dvh] md:h-auto"
        >
          <div className="p-[18px]">
            <p className="text-[18px] font-medium text-greydark text-center mb-6 opacity-80">
              Are you sure you want to delete account?
            </p>
            <form onSubmit={formik.handleSubmit} noValidate className="w-full pb-3">
              <Input
                label={'Password'}
                placeholder={'Enter Password'}
                name="password"
                type="password"
                initialValue={formik?.values?.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                isRequired
                labelFontColor="#333333"
                className="w-full"
                borderClasses="!border-r border border-large border-customGray"
              />
            </form>
          </div>
        </ConfirmationModal>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default DeleteAccount;
