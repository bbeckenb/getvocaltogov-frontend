import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import UserContext from '../../context/UserContext';
import UserDeletePortal from './UserDeletePortal';

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
            <UserDeletePortal />      
        </UserContext.Provider>);

  expect(
    screen.getByRole("button", { name: "Delete" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Cancel" })
  ).toBeInTheDocument();

});