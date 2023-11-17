import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from './constants/urlPaths';
import HomePage from './pages/HomePage';
import GeneralInfo from './pages/GeneraInfo';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Work from './pages/Work';
import ProfilePage from './pages/ProfilePage';
import OtherUserProfile from './pages/OtherUserProfile';

const {
  LANDING,
  LOGIN,
  HOME,
  PATH_SIGNUP,
  PATH_VERIFY_EMAIL,
  PATH_GENERAL_INFO,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  PATH_WORK,
  PROFILE,
  OTHER_USER_PROFILE,
} = PATHS;

const publicRoutes = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={LOGIN} replace />,
  },
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
    element: <Signup />,
  },
  {
    path: PATH_VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: PATH_GENERAL_INFO,
    element: <GeneralInfo />,
  },
  {
    path: FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: PATH_WORK,
    element: <Work />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={HOME} replace={true} />,
  },
  {
    path: HOME,
    element: <HomePage />,
  },

  {
    path: PROFILE,
    element: <ProfilePage />,
  },
  {
    path: `${OTHER_USER_PROFILE}:id`,
    element: <OtherUserProfile />,
  },
  {
    path: `${HOME}/:id`,
    element: <HomePage />,
  },
]);

export { publicRoutes, privateRoutes };
