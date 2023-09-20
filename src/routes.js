import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './constants/urlPaths';
import GeneraInfo from './pages/GeneraInfo';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Singup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';

const { LANDING, LOGIN, PATH_SIGNUP, PATH_VERIFY_EMAIL, PATH_GENERAL_INFO } = PATHS;

const routes = createBrowserRouter([
  {
    path: LANDING,
    element: <LandingPage />,
  },
  {
    path: LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATH_SIGNUP,
    element: <Singup />,
  },
  {
    path: PATH_VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: PATH_GENERAL_INFO,
    element: <GeneraInfo />,
  },
]);

export default routes;
