import { Navbar, Nav } from 'react-bootstrap';

function NavBarLoggedIn({ logout, username }) {
   return (
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
           <Nav.Link href="/posts">Posts</Nav.Link>
           <Nav.Link href="/templates">Templates</Nav.Link>
        </Nav>
        <Nav>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={() => logout()} href="/">{`Logout ${username}`}</Nav.Link>
        </Nav>
    </Navbar.Collapse>
   ) 
}

export default NavBarLoggedIn;