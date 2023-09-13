import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Divider from '../../components/common/Divider';
import Input from '../../components/common/Input';
import * as yup from 'yup';
import { Button } from '../../components/common/Button';
import { VALIDATION } from '../../constants/constants';
import { MESSAGES } from '../../constants/messages';

const { EMAIL_REGEX } = VALIDATION;
const { IS_REQUIRED, EMAIL_INVALID, PASSWORD_INVALID } = MESSAGES;

const initialValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const onSubmit = (values) => {
    // Here, you'd typically make an API call to login
    console.log('Login data:', values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
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
      <h1 className="text-white pr-2">Welcome Back</h1>
      <h4 className="text-white mt-2 mb-4 pr-2">Let’s build something great together!</h4>
      <Divider width="90%" />

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px]">
        <div className="mt-[15px]">
          <Input
            label="Email address"
            placeholder="Enter Email"
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
            label="Password"
            placeholder="Enter Password"
            name="password"
            type="password"
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            isRequired
            className="w-full"
          />
          <div className="text-right text-white text-[14px] font-semibold mt-1">
            Forgot Password?
          </div>
        </div>

        <Button
          label="Submit"
          type="submit"
          isDisabled={!formik.values.email && !formik.values.password}
        />

        <p className="text-white text-center">
          Don’t have an account?<strong> Sign Up</strong>
        </p>
      </form>
    </AuthPanelLayout>
  );
}

export default LoginPage;
