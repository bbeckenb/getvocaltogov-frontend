import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBarLoggedIn from './NavBarLoggedIn';

test('renders without crashing', () => {
  render(<NavBarLoggedIn />);
});

describe("NavBarLoggedIn", () => {
  it("should render the basic fields", () => {
    render(<NavBarLoggedIn logout={'logout'} username='test'/>);
    expect(
      screen.getByRole("link", { name: "Logout test" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Profile" })
    ).toBeInTheDocument();
  });
});