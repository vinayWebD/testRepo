import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import MultiColorLoader from './components/common/MultiColorLoader';
import { logoutDispatcher, profileDispatcher } from './redux/dispatchers/authDispatcher';
import { privateRoutes, publicRoutes } from './routes';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const globalLoading = useSelector((state) => state.auth.globalLoading);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(profileDispatcher());
    } else {
      dispatch(logoutDispatcher());
    }
  }, []);

  if (globalLoading) {
    return <MultiColorLoader />; // Or a loading spinner component
  }

  if (isAuthenticated) {
    return <RouterProvider router={privateRoutes} />;
  } else if (isAuthenticated === false) {
    return <RouterProvider router={publicRoutes} />;
  } else {
    return <MultiColorLoader />;
  }
};

export default App;
