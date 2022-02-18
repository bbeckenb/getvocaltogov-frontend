import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import UserContext from '../../context/UserContext';

function NavBarLoggedOut() {
    const { loadingUser } = useContext(UserContext);

    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/posts">Posts</Nav.Link>
                <Nav.Link href="/templates">Templates</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/about">About</Nav.Link>
                {loadingUser ? 
                <Nav.Link href="">Loading</Nav.Link> :
                <><Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/signup">Sign up</Nav.Link></>
                }
            </Nav>
        </Navbar.Collapse>
    ) 
}

export default NavBarLoggedOut;