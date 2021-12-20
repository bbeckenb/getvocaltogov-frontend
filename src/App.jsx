import React from 'react';
import AppRoutes from './components/Routes/AppRoutes';
import GetVocalToGovApi from './GetVocalToGovApi';
import './App.css';

const App = function () {
  const [token, setToken] = useLocalStorage('stored-token');

  async function loginUser(credentials) {
    try {
      const userLoggingIn = await GetVocalToGovApi.loginUser(credentials);
      GetVocalToGovApi.token = userLoggingIn.token;
    } catch (err) {
      console.error('Encountered issue logging user in:', err);
    }
  }

  return (
    <div className="App">
      <AppRoutes loginUser={loginUser} />
    </div>
  );
};

export default App;
