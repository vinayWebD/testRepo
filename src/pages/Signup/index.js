import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Input from '../../components/common/Input';
import * as yup from 'yup';
import { Button } from '../../components/common/Button';
import { VALIDATION } from '../../constants/constants';
import { MESSAGES } from '../../constants/messages';
import { LANG } from '../../constants/lang';
import { useNavigate } from 'react-router';
import { PATHS } from '../../constants/urlPaths';
import Checkbox from '../../components/Checkbox';

const { EMAIL_REGEX } = VALIDATION;
const { LOGIN, PATH_VERIFY_EMAIL } = PATHS;
const { IS_REQUIRED, EMAIL_INVALID, PASSWORD_INVALID } = MESSAGES;
const {
  LANG_SIGNUP_WELCOME_HEADING,
  LANG_SIGNUP_WELCOME_SUBHEADING,
  LANG_SIGNUP_FIRST_NAME_LABEL,
  LANG_SIGNUP_FIRST_NAME_PLACEHOLDER,
  LANG_SIGNUP_LAST_NAME_LABEL,
  LANG_SIGNUP_LAST_NAME_PLACEHOLDER,
  LANG_SIGNUP_EMAIL_LABEL,
  LANG_SIGNUP_EMAIL_PLACEHOLDER,
  LANG_SIGNUP_PASSWORD_LABEL,
  LANG_SIGNUP_PASSWORD_PLACEHOLDER,
  LANG_SIGNUP_REGISTER,
  LANG_SIGNUP_PRIVACY,
  LANG_SIGNUP_TERMS,
  LANG_SIGNUP_HAVE_ACC,
  LANG_SIGNUP_SIGN_IN,
  LANG_SIGNUP_SAVE_NEXT,
} = LANG.PAGES.SIGNUP;

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

function Singup() {
  const navigate = useNavigate();
  const onSubmit = () => {
    // Here, you'd typically make an API call to login
    navigate(PATH_VERIFY_EMAIL);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      firstname: yup.string().required(IS_REQUIRED('First Name')),
      lastname: yup.string().required(IS_REQUIRED('Last Name')),
      email: yup
        .string()
        .required(IS_REQUIRED('Email'))
        .test('isValidEmailFormat', EMAIL_INVALID, (value) => EMAIL_REGEX.test(value)),
      password: yup
        .string()
        .required(IS_REQUIRED('Password'))
        .test('isPasswordLengthValid', PASSWORD_INVALID, (value) => value && value.length >= 6),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <h1 className="text-white pr-2">{LANG_SIGNUP_WELCOME_HEADING}</h1>
      <div className="border-b border-[#F2F2F233] max-w-fit">
        <h4 className="text-white mt-2 mb-4 pr-2">{LANG_SIGNUP_WELCOME_SUBHEADING}</h4>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px] max-w-[400px] mt-2">
        <div className="mt-[15px] flex items-center gap-8 md:flex-row flex-col ">
          <Input
            label={LANG_SIGNUP_FIRST_NAME_LABEL}
            placeholder={LANG_SIGNUP_FIRST_NAME_PLACEHOLDER}
            name="firstname"
            type="text"
            value={formik?.values?.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            isRequired
            className="w-full"
          />
          <Input
            label={LANG_SIGNUP_LAST_NAME_LABEL}
            placeholder={LANG_SIGNUP_LAST_NAME_PLACEHOLDER}
            name="lastname"
            type="text"
            value={formik?.values?.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_SIGNUP_EMAIL_LABEL}
            placeholder={LANG_SIGNUP_EMAIL_PLACEHOLDER}
            name="email"
            type="email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_SIGNUP_PASSWORD_LABEL}
            placeholder={LANG_SIGNUP_PASSWORD_PLACEHOLDER}
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
        <div className="flex gap-2 items-start max-w-[400px]">
          <Checkbox />
          <div className="para-sm">
            {LANG_SIGNUP_REGISTER}{' '}
            <a href="#" className="link-sm">
              {LANG_SIGNUP_TERMS}{' '}
            </a>
            and{' '}
            <a href="#" className="link-sm">
              {LANG_SIGNUP_PRIVACY}
            </a>
          </div>
        </div>
        <Button
          label={LANG_SIGNUP_SAVE_NEXT}
          type="submit"
          isDisabled={!formik.values.email && !formik.values.password}
          additionalClassNames="capitalize"
        />
        <div className="text-white text-center cursor-pointer mb-9" onClick={() => navigate(LOGIN)}>
          {LANG_SIGNUP_HAVE_ACC}
          <span className="">
            <strong>{LANG_SIGNUP_SIGN_IN}</strong>
          </span>
        </div>
      </form>
    </AuthPanelLayout>
  );
}

export default Singup;
