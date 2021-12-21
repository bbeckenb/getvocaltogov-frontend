import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
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
    expect(screen.getByRole("button")).toBeInTheDocument();

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

  fireEvent.submit(screen.getByRole("button"));
  expect(await screen.findAllByRole("alert")).toHaveLength(3);
  expect(mockSave).not.toBeCalled();
});