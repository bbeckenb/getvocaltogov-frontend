import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Form, Button, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLoginForm = function ({ login }) {
//   const { existingUser } = useContext(UserContext);
//   const INIT_STATE = existingUser || { username: '', password: '' };
  const INIT_STATE = { username: '', password: '' };
  const [formData, setFormData] = useState(INIT_STATE);
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((currFormData) => ({ ...currFormData, [name]: value }));
  }

  function handleSubmit(evt) {
    try {
      evt.preventDefault();
      login(formData);
      setFormData(INIT_STATE);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold text-center">
              Log In!
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
                  style={{ backgroundColor: '#FDF2E9' }}
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
                  style={{ backgroundColor: '#FDF2E9' }}
                />
              </Form.Group>
              <Button style={{backgroundColor:'#21618C'}} variant="primary" type="submit">
                        Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserLoginForm;
