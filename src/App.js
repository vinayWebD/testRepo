import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginDispatcher, logoutDispatcher } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state?.auth);

  const handleLogin = async () => {
    try {
      dispatch(loginDispatcher({ username: 'purdriven', password: 'dianapps' }));
    } catch (error) {
      // Handle authentication error
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(loginDispatcher({ username: 'purdriven', password: 'dianapps' }));
    }
  }, []);

  const handleLogout = () => {
    if (user?.name) {
      dispatch(logoutDispatcher());
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        You are using: {process.env.REACT_APP_ENV}
        {token ? (
          <p>
            You are logged in as {user?.name} <button onClick={handleLogout}>Logout</button>
          </p>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </header>
    </div>
  );
}

export default App;
