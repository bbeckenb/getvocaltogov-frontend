import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../Common/Alert';
import loginSchema from '../../validationSchemas/loginSchema';
import UserContext from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLoginForm = function () {
  const { login } = useContext(UserContext);
  const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(loginSchema)});

  async function onSubmit(formData) {
    let res = await login(formData);
    if (res.success) {
      setFormMessage({type: 'primary', message: 'success!'});
      history.push('/');
    } else {
      console.log(res)
      setFormMessage({type: 'danger', message: `${res.error}`});
    }
  }

  function resetFormAndMsg() {
    setFormMessage({type: 'primary', message: 'welcome!'});
    reset()
  }

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold text-center" role="heading">
              Log In!
            </Card.Title>
            <div className="login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    aria-label="username"
                    name="username"
                    placeholder="username"
                    type="text"
                    {...register('username')}
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.username?.message}</div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    aria-label="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.password?.message}</div>
                </div>
                <Alert type={formMessage.type} message={formMessage.message} />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => resetFormAndMsg()}
                    className="btn btn-warning float-right"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserLoginForm;
