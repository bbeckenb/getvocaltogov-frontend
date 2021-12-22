import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import {jest} from '@jest/globals'
import UserSignUpForm from './UserSignUpForm';

it('renders without crashing', () => {
  render(<UserSignUpForm />);
});

describe("UserSignUpForm", () => {
  it("should render the basic fields", () => {
    render(<UserSignUpForm />);
    expect(
      screen.getByRole("heading", { name: "Sign Up!" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("city")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("state")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("zip")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();

  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(<UserSignUpForm signup={mockSave} />);
  fireEvent.input(screen.getByPlaceholderText("username"), {
    target: {
      value:
        "testUsername"
    }
  });

  fireEvent.input(screen.getByPlaceholderText("city"), {
    target: { value: "test city"}
  });

  fireEvent.submit(screen.getByRole("button", { name: /Register/i }));
  expect(await screen.findAllByRole("alert")).toHaveLength(9);
  expect(mockSave).not.toBeCalled();
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<UserSignUpForm signup={mockSave} />);
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

  fireEvent.submit(screen.getByRole("button", { name: /Register/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
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