import React from "react";
import { render, screen } from '@testing-library/react';
import UserContext from '../../context/UserContext';
import { MemoryRouter } from "react-router";
import AuthRoute from "./AuthRoute";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserContext.Provider value={{token: true}}>
          <AuthRoute />
        </UserContext.Provider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{token: true}}>
          <AuthRoute />
        </UserContext.Provider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});


