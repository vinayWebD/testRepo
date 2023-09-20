import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from './constants/urlPaths';
import HomePage from './pages/HomePage';
import GeneraInfo from './pages/GeneraInfo';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Singup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';

const { LANDING, LOGIN, HOME, PATH_SIGNUP, PATH_VERIFY_EMAIL, PATH_GENERAL_INFO } = PATHS;

const publicRoutes = createBrowserRouter([
  {
    path: LANDING,
    element: <LandingPage />,
  },
  {
    path: LOGIN,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to={LOGIN} replace />,
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

const privateRoutes = createBrowserRouter([
  {
    path: HOME,
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Navigate to={HOME} replace />,
  },
]);

export { publicRoutes, privateRoutes };
