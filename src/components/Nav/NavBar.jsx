import React, { useContext } from 'react';
import NavBarLoggedOut from './NavBarLoggedOut';
import NavBarLoggedIn from './NavBarLoggedIn';
import UserContext from '../../context/UserContext';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = function ({ logout }) {
  const {currUser} = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">GVTG</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {currUser ? <NavBarLoggedIn logout={logout} username={currUser.user.username}/> : <NavBarLoggedOut />}
      </Container>
    </Navbar>
  );
};

export default NavBar;
