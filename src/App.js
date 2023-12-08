import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import MultiColorLoader from './components/common/MultiColorLoader';
import { logoutDispatcher, profileDispatcher } from './redux/dispatchers/authDispatcher';
import { privateRoutes, publicRoutes, signupRoutes } from './routes';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated = false, isOriginSignup = false } = useSelector(
    (state) => state.auth || {},
  );
  const { globalLoading = false } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(profileDispatcher());
    } else {
      dispatch(logoutDispatcher());
    }
  }, [localStorage.getItem('token')]);

  if (globalLoading) {
    return <MultiColorLoader />;
  }

  if (isOriginSignup) {
    // If the origin is signup, then we need to redirect the user to a signup page
    return <RouterProvider router={signupRoutes} fallbackElement={() => <MultiColorLoader />} />;
  } else if (isAuthenticated) {
    return <RouterProvider router={privateRoutes} fallbackElement={() => <MultiColorLoader />} />;
  } else if (isAuthenticated === false) {
    return <RouterProvider router={publicRoutes} fallbackElement={() => <MultiColorLoader />} />;
  } else {
    return <MultiColorLoader />;
  }
};

export default App;
