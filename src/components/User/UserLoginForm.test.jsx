import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserLoginForm from './UserLoginForm';
import {jest} from '@jest/globals'

it('renders without crashing', () => {
  render(<UserLoginForm />);
});

describe("UserSignUpForm", () => {
  it("should render the basic fields", () => {
    render(<UserLoginForm />);
    expect(
      screen.getByRole("heading", { name: "Log In!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Username/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();   
  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(<UserLoginForm login={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Username/i }), {
    target: { value: 'sw110' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Login/i }));
  expect(await screen.findAllByRole("alert")).toHaveLength(2);
  expect(await screen.findByText('Username must be at least 6 characters')).toBeInTheDocument();
  expect(await screen.findByText('Password is required')).toBeInTheDocument();
  expect(mockSave).not.toBeCalled();
});


it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<UserLoginForm login={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Username/i }), {
    target: { value: 'sw1107' }
  });
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, {target: {value:'123456'}});

  fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
      username: 'sw1107',
      password: '123456'
    })
  );
});