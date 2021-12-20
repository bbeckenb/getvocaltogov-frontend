import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Card, Form, Button, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserSignUpForm = function ({ signup }) {
    const INIT_STATE = {
                        username: '', 
                        password:'', 
                        firstName:'', 
                        lastName:'', 
                        street:'', 
                        city: '',
                        state: '',
                        zip: '',
                        email:'', 
                        }
    const [formData, setFormData] = useState(INIT_STATE);
    // const [isChecked, setIsChecked] = useState(false);
    let history = useHistory();

    
    function handleChange(evt) {
        const {name, value} = evt.target;
        console.log(formData)
        setFormData(currFormData => ({...currFormData, [name]: value}));
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        signup(formData);
        setFormData(INIT_STATE);
        history.push('/');
    }

    // function handleChangeCheckBox() {
    //     setFormData(currFormData => ({...currFormData, isAdmin: !isChecked}))
    //     setIsChecked(!isChecked);
    // }

    return (
    <Container>
        <Row className="justify-content-lg-center">
            <Card style={{ width: '800px', backgroundColor:'#AED6F1'}}>
                <Card.Body>
                <Card.Title className="font-weight-bold text-center">
                    Sign Up!
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control
                            id="username"
                            name="username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ backgroundColor:'#FDF2E9'}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ backgroundColor:'#FDF2E9'}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="firstName">First Name:</Form.Label>
                        <Form.Control
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={{ backgroundColor:'#FDF2E9'}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                        <Form.Control
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={{ backgroundColor:'#FDF2E9'}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="street">Street: </Form.Label>
                        <Form.Control
                            id="street"
                            name="street"
                            placeholder="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="city">City: </Form.Label>
                        <Form.Control
                            id="city"
                            name="city"
                            placeholder="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="state">State: </Form.Label>
                        <Form.Control
                            id="state"
                            name="state"
                            placeholder="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="zip">Zip: </Form.Label>
                        <Form.Control
                            id="zip"
                            name="zip"
                            placeholder="zip"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email:</Form.Label>
                        <Form.Control
                            id="email"
                            name="email"
                            placeholder="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ backgroundColor:'#FDF2E9'}}
                        />
                    </Form.Group>
                    <Button style={{backgroundColor:'#21618C'}} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Card.Body>
            </Card>
        </Row>
    </Container>
      );
}

export default UserSignUpForm;