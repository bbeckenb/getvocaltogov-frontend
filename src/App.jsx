import React, { useState, useEffect } from 'react';
import AppRoutes from './components/Routes/AppRoutes';
import useLocalStorage from './customHooks/useLocalStorage';
import GetVocalToGovApi from './GetVocalToGovApi';
import UtilClass from './classes/UtilClass';
import UserContext from './context/UserContext';
import './App.css';

const App = function () {
  const [token, setToken] = useLocalStorage('stored-token');
  const [currUser, setCurrUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set([]));
  const [bookmarkIds, setBookmarkIds] = useState(new Set([]));


  useEffect(function getCurrUser() {
    async function getCurrUserAPICall() {
      if(token) {
        try {
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
        setToken(user.token);
        GetVocalToGovApi.token = user.token;
        return { success: true };
      }
    } catch (error) {
      console.error('Encountered issue logging user in:', error);
      return { success: false, error }
    }
  }

  async function editUser(userData) {
    try {
        const editedUser = await GetVocalToGovApi.updateUser(currUser.username, userData);
        if (editedUser) {
            await login({
              username: editedUser.username, 
              password: userData.password
            });
            return { success: true };
        }
    } catch (error) {
            console.error('Encountered issue editing User:', error);
            return { success: false, error }
    }
  }

  async function deleteProfile(username) {
    try {
      const deletedUser = await GetVocalToGovApi.deleteUser(username);
      if (deletedUser) {
          return {success: true};
      }
    } catch (error) {
          console.error('Encountered issue deleting User Profile:', error);
          return {success: false, error};
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

  function hasBookmarked(id) {
    return bookmarkIds.has(id);
  }

  async function addBookmark(id) {
    if (hasBookmarked(id)) return;
    const postId = await GetVocalToGovApi.bookmarkPost(currUser.username, id);
    setBookmarkIds(new Set([...bookmarkIds, postId]))
  }

  async function removeBookmark(id) {
    if (!hasBookmarked(id)) return;
    const postId = await GetVocalToGovApi.unbookmarkPost(currUser.username, id);
    bookmarkIds.delete(postId);
    setBookmarkIds(new Set(bookmarkIds));
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ 
        currUser, 
        setCurrUser,
        token, 
        editUser,
        deleteProfile,
        hasFavorited, 
        addFavorite, 
        removeFavorite, 
        hasBookmarked, 
        addBookmark, 
        removeBookmark,
        login,
        signup,
        logout, }}>
        <AppRoutes />
      </UserContext.Provider>
    </div>
  );
};

export default App;
