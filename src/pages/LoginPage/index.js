import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Divider from '../../components/common/Divider';
import Input from '../../components/common/Input';
import * as yup from 'yup';

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
        .required('Email is required')
        .test('isValidEmailFormat', 'Invalid email address', (value) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
        ),
      password: yup
        .string()
        .required('Password is required')
        .test(
          'isPasswordLengthValid',
          'Password must be at least 6 characters',
          (value) => value && value.length >= 6,
        ),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <h1 className="text-white mt-14 pr-2">Welcome Back</h1>
      <h4 className="text-white mt-2 mb-4 pr-2">Let’s build something great together!</h4>
      <Divider />

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px]">
        {/* <Input type="email" name="email" label='Email address' isRequired className='h-[50px] w-[400px]' placeholder={'Enter Email'}  />
        <Input type="password" name="password" label='Password' isRequired className='h-[50px] w-[400px]' placeholder={'Enter Password'}  /> */}

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
        />
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
        />
        <button
          type="submit"
          disabled={false}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </AuthPanelLayout>
  );
}

export default LoginPage;
