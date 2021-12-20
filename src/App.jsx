import React, { useState, useEffect } from 'react';
import AppRoutes from './components/Routes/AppRoutes';
import useLocalStorage from './customHooks/useLocalStorage';
import GetVocalToGovApi from './GetVocalToGovApi';
import UtilClass from './classes/UtilClass';
import './App.css';

const App = function () {
  const [token, setToken] = useLocalStorage('stored-token');
  // const [storedUser, setStoredUser] = useLocalStorage('stored-user');
  const [currUser, setCurrUser] = useState(null);

  useEffect(function getCurrUser() {
    async function getCurrUserAPICall() {
      if(token) {
        try {
          // const { username } = jwt.decode(token);
          const { username } = UtilClass.parseJwt(token);
          console.log(username)
          GetVocalToGovApi.token = token;
          const user = await GetVocalToGovApi.getUser(username);
          console.log(user);
          setCurrUser(user);
        } catch (err) {
          console.error('Encountered Issue loading user:', err);
          setCurrUser(null);
        }
      }
    }
    getCurrUserAPICall();
  }, [token]);

  async function signup(userData) {
    try {
      let user = await GetVocalToGovApi.registerUser(userData);
      setToken(user.token);
      GetVocalToGovApi.token = user.token;
    } catch (err) {
      console.error('App problem with SignUp:', err);
    }
  }

  async function login(credentials) {
    try {
      const user = await GetVocalToGovApi.loginUser(credentials);
      setToken(user.token);
      GetVocalToGovApi.token = user.token;
    } catch (err) {
      console.error('Encountered issue logging user in:', err);
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <AppRoutes login={login} signup={signup} logout={logout} />
    </div>
  );
};

export default App;
