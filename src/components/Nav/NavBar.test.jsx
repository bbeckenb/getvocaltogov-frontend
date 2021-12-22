import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import UserContext from '.././../context/UserContext'
import {jest} from '@jest/globals'

describe('NavBar', () => {
  it('renders logged in text when currUser is present', () => {
    const mockLogout = jest.fn();
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
        <NavBar logout={mockLogout}/>;
      </UserContext.Provider>
    )
    expect(
      screen.getByRole("link", { name: "Logout test" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Profile" })
    ).toBeInTheDocument();
  });

  it('renders logged out links when currUser is undefined', () => {
    const mockLogout = jest.fn();
    const currUser = undefined
    render(
      <UserContext.Provider value={{currUser}}>
        <NavBar logout={mockLogout}/>;
      </UserContext.Provider>
    )
    expect(
      screen.getByRole("link", { name: "Login" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign up" })
    ).toBeInTheDocument();
  });
});
