import React, { useContext } from 'react';
import NavBarLoggedOut from './NavBarLoggedOut';
import NavBarLoggedIn from './NavBarLoggedIn';
import UserContext from '../../context/UserContext';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = function () {
  const {currUser, logout} = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/"><i className="fas fa-bullhorn"> GetVocalToGov</i></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {currUser ? <NavBarLoggedIn logout={logout} username={currUser.username}/> : <NavBarLoggedOut />}
      </Container>
    </Navbar>
  );
};

export default NavBar;
