import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBarLoggedOut from './NavBarLoggedOut';

test('renders learn react link', () => {
  render(<NavBarLoggedOut />);
});

describe("NavBarLoggedOut", () => {
  it("should render the basic fields", () => {
    render(<NavBarLoggedOut />);
    expect(
      screen.getByRole("link", { name: "Login" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign up" })
    ).toBeInTheDocument();
  });
});