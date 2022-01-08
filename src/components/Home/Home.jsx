import React, { useContext } from "react";
import UserContext from '../../context/UserContext'
import { Container, ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

function Home() {
    const { token } = useContext(UserContext);
    const history = useHistory();

    return (
        <Container>
            <h1 style={{'marginTop': '40px', 'fontSize': '50px'}}>Welcome to GetVocalToGov!</h1>
            <i>Exchange your ideas on current events and let your thoughts be heard!</i>
            {token ? 
            <>
                <h4 style={{'marginTop': '50px', 'fontSize': '20px'}}>Go somewhere! </h4>
                <ButtonGroup style={{'marginTop': '5px', 'marginBottom': '50px', 'fontSize': '20px'}}>
                    <DropdownButton as={ButtonGroup} title="Options" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => history.push('/about')}>About</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={() => history.push('/posts')}>Posts</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={() => history.push('/templates')}>Templates</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup> 
            </> : <>
            <h4 style={{'marginTop': '50px', 'fontSize': '20px'}}>New here? <Link to='/about'>Learn more</Link> about 
            the app or sign up below!</h4>
            <ButtonGroup style={{'marginTop': '5px', 'fontSize': '20px'}}>
                <Button onClick={() => history.push('/signup')}>Sign up</Button>
            </ButtonGroup>
            <h4 style={{'marginTop': '50px','fontSize': '20px'}}>Returning user or want to <b>demo</b>?</h4>
            <ButtonGroup style={{'marginTop': '5px', 'marginBottom': '50px', 'fontSize': '20px'}}>
                <Button onClick={() => history.push('/login')}>Login</Button>
            </ButtonGroup>
            </>}
        </Container>
    );
}

export default Home;