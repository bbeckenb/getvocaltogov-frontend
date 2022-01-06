import React from "react";
import { render, screen } from '@testing-library/react';
import UserContext from '../../context/UserContext';
import { MemoryRouter } from "react-router";
import AuthRoute from "./AuthRoute";

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

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserContext.Provider value={{currUser}}>
          <AuthRoute />
        </UserContext.Provider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{currUser}}>
          <AuthRoute />
        </UserContext.Provider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{currUser: null}}>
          <AuthRoute />
        </UserContext.Provider>
      </MemoryRouter>,
  );
  console.log(asFragment)
  expect(asFragment()).toMatchSnapshot();
});
