import React, { useState, useEffect } from 'react';
import AppRoutes from './components/Routes/AppRoutes';
import useLocalStorage from './customHooks/useLocalStorage';
import GetVocalToGovApi from './GetVocalToGovApi';
import UtilClass from './classes/UtilClass';
import UserContext from './context/UserContext';
import './App.css';

const App = function () {
  const [token, setToken] = useLocalStorage('stored-token');
  // const [storedUser, setStoredUser] = useLocalStorage('stored-user');
  const [currUser, setCurrUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set([]));
  const [bookmarkIds, setBookmarkIds] = useState(new Set([]));


  useEffect(function getCurrUser() {
    async function getCurrUserAPICall() {
      if(token) {
        try {
          // const { username } = jwt.decode(token);
          const { username } = UtilClass.parseJwt(token);
          GetVocalToGovApi.token = token;
          const user = await GetVocalToGovApi.getUser(username);
          setCurrUser(user);
          setFavoriteIds(new Set(user.favorites));
          setBookmarkIds(new Set(user.bookmarks));
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
      if (user) {
        setToken(user.token);
        GetVocalToGovApi.token = user.token;
        return { success: true };
      }
    } catch (error) {
      console.error('Encountered issue registering user:', error);
      return { success: false, error }
    }
  }

  async function login(credentials) {
    try {
      let user = await GetVocalToGovApi.loginUser(credentials);
      if (user) {
        console.log(user.token);
        setToken(user.token);
        GetVocalToGovApi.token = user.token;
        return { success: true };
      }
    } catch (error) {
      console.error('Encountered issue logging user in:', error);
      return { success: false, error }
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
    console.log(currUser)
  }

  function hasFavorited(id) {
    return favoriteIds.has(id);
  }

  async function addFavorite(id) {
    if (hasFavorited(id)) return;
    const templateId = await GetVocalToGovApi.favoriteTemplate(currUser.username, id);
    setFavoriteIds(new Set([...favoriteIds, templateId]))
  }

  async function removeFavorite(id) {
    if (!hasFavorited(id)) return;
    const templateId = await GetVocalToGovApi.unfavoriteTemplate(currUser.username, id);
    favoriteIds.delete(templateId);
    setFavoriteIds(new Set(favoriteIds));
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currUser, setCurrUser, hasFavorited, addFavorite, removeFavorite }}>
        <AppRoutes login={login} signup={signup} logout={logout} />
      </UserContext.Provider>
    </div>
  );
};

export default App;
