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
import MyNetwork from './pages/MyNetwork';
import OtherUserProfile from './pages/OtherUserProfile';
import Messages from './pages/Messages';
import NotificationPage from './pages/NotificationPage';
import Settings from './pages/Settings';
import ChangePassword from './pages/Settings/ChangePassword';
import HelpCenter from './pages/Settings/HelpCenter';
import PrivacySetting from './pages/Settings/PrivacySetting';
import Interest from './pages/Interests';
import Myself from './pages/Myself';
import { AddCareer } from './pages/Work/AddNewCareer';
import DeleteAccount from './pages/Settings/DeleteAccount';

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
  MYNETWORK,
  OTHER_USER_PROFILE,
  MESSAGES,
  MY_NOTIFICATION,
  SETTINGS,
  SETTINGS_CHANGE_PASSWORD,
  SETTINGS_HELP_CENTER,
  SETTINGS_PRIVACY_SETTING,
  PATH_INTERESTS,
  PATH_MYSELF,
  PATH_ADD_CAREER,
  SETTINGS_DELETE_ACCOUNT,
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
    path: FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: RESET_PASSWORD,
    element: <ResetPassword />,
  },
]);

// If the origin is signup, then we need to redirect the user to a signup page
const signupRoutes = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={PATH_GENERAL_INFO} replace={true} />,
  },
  {
    path: PATH_WORK,
    element: <Work />,
  },
  {
    path: PATH_INTERESTS,
    element: <Interest />,
  },
  {
    path: PATH_MYSELF,
    element: <Myself />,
  },
  {
    path: PATH_ADD_CAREER,
    element: <AddCareer />,
  },
  {
    path: PATH_GENERAL_INFO,
    element: <GeneralInfo />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: PATH_GENERAL_INFO,
    element: <GeneralInfo />,
  },
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
    path: MYNETWORK,
    element: <MyNetwork />,
  },
  {
    path: `${OTHER_USER_PROFILE}:id`,
    element: <OtherUserProfile />,
  },
  {
    path: `${HOME}/:id`,
    element: <HomePage />,
  },
  {
    path: MESSAGES,
    element: <Messages />,
  },
  {
    path: MY_NOTIFICATION,
    element: <NotificationPage />,
  },
  {
    path: SETTINGS,
    element: <Settings />,
  },
  {
    path: SETTINGS_CHANGE_PASSWORD,
    element: <ChangePassword />,
  },
  {
    path: SETTINGS_HELP_CENTER,
    element: <HelpCenter />,
  },
  {
    path: SETTINGS_PRIVACY_SETTING,
    element: <PrivacySetting />,
  },
  {
    path: SETTINGS_DELETE_ACCOUNT,
    element: <DeleteAccount />,
  },
  {
    path: PATH_WORK,
    element: <Work />,
  },
  {
    path: PATH_INTERESTS,
    element: <Interest />,
  },
  {
    path: PATH_MYSELF,
    element: <Myself />,
  },
  {
    path: PATH_ADD_CAREER,
    element: <AddCareer />,
  },
]);

export { publicRoutes, privateRoutes, signupRoutes };
