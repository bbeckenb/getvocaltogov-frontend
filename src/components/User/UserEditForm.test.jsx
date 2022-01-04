import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import UserContext from '../../context/UserContext';
import UserEditForm from './UserEditForm';

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

it('renders without crashing', () => {
    render(
        <UserContext.Provider value={{currUser}}>
            <UserEditForm />      
        </UserContext.Provider>);
});

it("should display the proper fields", async () => {
    render(
        <UserContext.Provider value={{currUser}}>
            <UserEditForm />      
        </UserContext.Provider>);

    expect(
        screen.getByRole("textbox", { name: "username" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "firstName" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "lastName" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "street" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "city" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "state" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "zip" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "email" })
    ).toBeInTheDocument();
});

