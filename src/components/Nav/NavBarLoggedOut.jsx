import { Navbar, Nav } from 'react-bootstrap';

function NavBarLoggedOut() {
   return (
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
           <Nav.Link href="/posts">Posts</Nav.Link>
           <Nav.Link href="/templates">Templates</Nav.Link>
       </Nav>
       <Nav>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav>
    </Navbar.Collapse>
   ) 
}

export default NavBarLoggedOut;