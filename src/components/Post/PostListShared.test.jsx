import React from 'react';
import { render } from '@testing-library/react';
import UserContext from '../../context/UserContext';

import PostListShared from './PostListShared';

it('renders without crashing', () => {
    const currUser = { user: {
      firstName: 'Jimmothy',
      lastName: 'Deanus',
      username: 'test',
      password: '1234',
      street: '60 Sierra Street',
      city: 'Calumet City',
      state: 'IL',
      zip: '60409',
      county: 'Cook',
      email: 'jdean@gmail.com',
      isAdmin: true,
    }};
  
    render(
      <UserContext.Provider value={{currUser}}>
        <PostListShared />
      </UserContext.Provider>);
});