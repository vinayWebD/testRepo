import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from './constants/urlPaths';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const { LANDING, LOGIN, HOME } = PATHS;

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
