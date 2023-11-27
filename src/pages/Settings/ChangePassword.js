import React from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import Card from '../../components/common/Card';
import { useFormik } from 'formik';
import { validationChangePwdSchema } from '../../validations/auth';
import { Button } from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import { changePasswordDispatcher } from '../../redux/dispatchers/myProfileDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import Input from '../../components/common/Input';

const { SETTINGS } = PATHS;

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm, setValues }) => {
    const { status, data } = await dispatch(
      changePasswordDispatcher({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),
    );

    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      ToastNotifySuccess('Password changed successfully!');
      resetForm({ values: '' });
      setValues(initialValues);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationChangePwdSchema,
    onSubmit,
  });

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Change Password'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <form onSubmit={formik.handleSubmit} noValidate className="w-full pb-3">
          <div className="flex flex-col justify-center items-center md:mt-4">
            <div className="w-full flex justify-center">
              <Card classNames="w-full md:w-[60%] md:p-10 py-6 px-4">
                <div className="flex flex-col gap-5">
                  <p className="text-[16px] font-medium w-full">Create a New Password</p>

                  <Input
                    label={'Old Password'}
                    placeholder={'Enter Old Password'}
                    name="oldPassword"
                    type="password"
                    initialValue={formik?.values?.oldPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    isRequired
                    labelFontColor="#333333"
                    className="w-full"
                    borderClasses="!border-r border border-large border-customGray"
                  />
                  <Input
                    label={'New Password'}
                    placeholder={'Enter New Password'}
                    name="newPassword"
                    type="password"
                    initialValue={formik?.values?.newPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    isRequired
                    labelFontColor="#333333"
                    className="w-full"
                    borderClasses="!border-r border border-large border-customGray"
                  />
                  <Input
                    label={'Confirm Password'}
                    placeholder={'Enter Confirm Password'}
                    name="confirmPassword"
                    type="password"
                    initialValue={formik?.values?.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    isRequired
                    labelFontColor="#333333"
                    className="w-full"
                    borderClasses="!border-r border border-large border-customGray"
                  />
                </div>
              </Card>
            </div>
            <div className="w-full md:w-[60%] mt-6 flex justify-center">
              <Button
                label="Save"
                type="submit"
                additionalClassNames="capitalize mr-0 !ml-auto"
                showArrowIcon={false}
              />
            </div>
          </div>
        </form>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default ChangePassword;
