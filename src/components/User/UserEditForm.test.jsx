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

it("should submit correct form data", async () => {
    const editUser = jest.fn();
    editUser.mockReturnValueOnce({ success: false })
    render(<UserContext.Provider value={{currUser, editUser}}>
                <UserEditForm />      
            </UserContext.Provider>);
    fireEvent.input(screen.getByRole("textbox", { name: /Username/i }), {
      target: { value: 'testUser' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /State/i }), {
      target: { value: 'MI' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /FirstName/i }), {
      target: { value: 'Fred' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /LastName/i }), {
      target: { value: 'Flintstone' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /City/i }), {
      target: { value: 'Flint' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /Zip/i }), {
      target: { value: '44444' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /Street/i }), {
      target: { value: 'banana street' }
    });
    fireEvent.input(screen.getByRole("textbox", { name: /Email/i }), {
      target: { value: 'banana@street.com' }
    });
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, {target: {value:'123456'}});
  
    fireEvent.submit(screen.getByRole("button", { name: /Edit User/i }));
  
    await waitFor(() =>
      expect(editUser).toHaveBeenCalledWith({
        username: 'testUser',
        password: '123456',
        street: 'banana street',
        state: 'MI',
        city: 'Flint',
        zip: '44444',
        email: 'banana@street.com',
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
    );
  });