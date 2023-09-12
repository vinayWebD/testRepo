import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './constants/urlPaths';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const { LANDING, LOGIN } = PATHS;

const routes = createBrowserRouter([
  {
    path: LANDING,
    element: <LandingPage />,
  },
  {
    path: LOGIN,
    element: <LoginPage />,
  },
]);

export default routes;
