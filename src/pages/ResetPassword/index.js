import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Input from '../../components/common/Input';
import * as yup from 'yup';
import { Button } from '../../components/common/Button';
import { MESSAGES } from '../../constants/messages';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { loginDispatcher } from '../../redux/dispatchers/authDispatcher';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { BackArrowIcon } from '../../components/Icons/BackArrowIcon';

const { IS_REQUIRED, PASSWORD_INVALID, CONFIRM_PASSWORD_MISMATCH } = MESSAGES;
const {
  LANG_GEN_WELCOME_HEADING,
  LANG_GEN_WELCOME_SUBHEADING,
  LANG_PWD_LABEL,
  LANG_C_PWD_LABEL,
  LANG_PWD_PLACEHOLDER,
  LANG_C_PWD_PLACEHOLDER,
} = LANG.PAGES.RESET_PASSWORD;

const { BTNLBL_SAVE } = BUTTON_LABELS;

const initialValues = {
  password: '',
  confirmPassword: '',
};

function ResetPassword() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    if (!isLoading) {
      setIsLoading(true);
      const loginResponse = await dispatch(loginDispatcher(values));

      setIsLoading(false);
      // Setting the error below the input fields in the form itself
      if (loginResponse?.status !== 200 && Object.keys(loginResponse?.data).length) {
        const errorData = Object.entries(loginResponse?.data)?.[0];
        formik.setErrors({ [errorData?.[0]]: errorData?.[1] });
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required(IS_REQUIRED('Password'))
        .test('isPasswordLengthValid', PASSWORD_INVALID, (value) => value && value.length >= 6),
      confirmPassword: yup
        .string()
        .required(IS_REQUIRED('Confirm Password'))
        .oneOf([yup.ref('password'), null], CONFIRM_PASSWORD_MISMATCH),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <div className="mb-2 border-b border-[#F2F2F233] max-w-fit">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => {}}>
            <BackArrowIcon />
          </span>
          <h1 className="text-white pr-2">{LANG_GEN_WELCOME_HEADING}</h1>
        </div>
        <h4 className="text-white mt-2 mb-4 pr-2">{LANG_GEN_WELCOME_SUBHEADING}</h4>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px] mt-4">
        <div>
          <Input
            label={LANG_PWD_LABEL}
            placeholder={LANG_PWD_PLACEHOLDER}
            name="password"
            type="password"
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_C_PWD_LABEL}
            placeholder={LANG_C_PWD_PLACEHOLDER}
            name="confirmPassword"
            type="password"
            value={formik?.values?.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            isRequired
            className="w-full"
          />
        </div>

        <Button
          label={BTNLBL_SAVE}
          type="submit"
          isDisabled={!formik.values.confirmPassword && !formik.values.password}
          additionalClassNames="capitalize"
          isLoading={isLoading}
        />
      </form>
    </AuthPanelLayout>
  );
}

export default ResetPassword;
