import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import Alert from '../Common/Alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLoginForm = function ({ login }) {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });
//   const { existingUser } = useContext(UserContext);
//   const INIT_STATE = existingUser || { username: '', password: '' };
  // const INIT_STATE = { username: '', password: '' };
  const [apiErrors, setApiErrors] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(validationSchema)});

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setFormData((currFormData) => ({ ...currFormData, [name]: value }));
  // }

  const onSubmit = formData => {
    let res = login(formData);
    if (res.success) {
      history.push('/');
    } else {
      setApiErrors('Invalid username/ password');
    }
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
                {apiErrors
                    ? <FlashMessage duration={5000}><Alert type="danger" message={apiErrors} /></FlashMessage>
                    : null}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => reset()}
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
