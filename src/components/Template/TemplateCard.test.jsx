import React from 'react';
import { render, screen } from '@testing-library/react';
import UserContext from '../../context/UserContext';
import TemplateCard from './TemplateCard';

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
      <TemplateCard />
    </UserContext.Provider>);
});

it('shows user options if owned by the user', () => {
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
      <TemplateCard userId='test' />
    </UserContext.Provider>);

  expect(
    screen.getByRole("button", { name: "Edit" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Delete" })
  ).toBeInTheDocument();
});

it('shows no user options if not owned by the user', () => {
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
      <TemplateCard userId='stranger' />
    </UserContext.Provider>);
  const buttonGroup = screen.queryByText('buttonGroup')
  expect(buttonGroup).not.toBeInTheDocument()
  
});