import React from 'react';
import UserContext from '../../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

it('renders without crashing', () => {
  
    render(
      <UserContext.Provider value={{token: true}}>
        <Home />
      </UserContext.Provider>);
  });
  
  it('shows user options if user logged in', () => {  
    render(
      <UserContext.Provider value={{token: true}}>
        <Home />
      </UserContext.Provider>);
  
    expect(
      screen.getByRole("button", { name: "Options" })
    ).toBeInTheDocument();
  });
  
  it('shows login and sign up if user not logged in', () => {

    render(
        <MemoryRouter>
            <UserContext.Provider value={{token: false}}>
                <Home />
            </UserContext.Provider>
        </MemoryRouter>
      );
    expect(
        screen.getByRole("button", { name: "Sign up" })
      ).toBeInTheDocument();
    
  });