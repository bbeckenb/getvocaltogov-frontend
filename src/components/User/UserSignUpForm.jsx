import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import Alert from '../Common/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../validationSchemas/registerSchema';
import {Card, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserSignUpForm = function ({ signup }) {
      const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});   
      const history = useHistory(); 
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({resolver: yupResolver(registerSchema)});
    

    async function sendData(formData) {
        let res = await signup(formData);
        let success = await res.success
        console.log(res)
        if (success) {
            setFormMessage({type: 'primary', message: 'success!'});
            history.push('/');
        } else {
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
            <Card style={{ width: '800px', backgroundColor:'#AED6F1'}}>
                <Card.Body>
                <Card.Title className="font-weight-bold text-center" role="heading">
                    Sign Up!
                </Card.Title>
                    <div className="registration-form">
                        <form onSubmit={handleSubmit(sendData)}>
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

                            <div className="form-group">
                            <label>First Name</label>
                            <input
                                aria-label="firstName"
                                name="firstName"
                                placeholder="First Name"
                                type="text"
                                {...register('firstName')}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.firstName?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>Last Name</label>
                            <input
                                aria-label="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                {...register('lastName')}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.lastName?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>Street</label>
                            <input
                                aria-label="street"
                                name="street"
                                placeholder="street"
                                type="text"
                                {...register('street')}
                                className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.street?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>City</label>
                            <input
                                aria-label="city"
                                name="city"
                                placeholder="city"
                                type="text"
                                {...register('city')}
                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.city?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>State</label>
                            <input
                                aria-label="state"
                                name="state"
                                placeholder="state"
                                type="text"
                                {...register('state')}
                                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.state?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>Zip</label>
                            <input
                                aria-label="zip"
                                name="zip"
                                placeholder="zip"
                                type="text"
                                {...register('zip')}
                                className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.zip?.message}</div>
                            </div>

                            <div className="form-group">
                            <label>Email</label>
                            <input
                                aria-label="email"
                                name="email"
                                placeholder="email"
                                type="text"
                                {...register('email')}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback" role="alert">{errors.email?.message}</div>
                            </div>
                            <Alert type={formMessage.type} message={formMessage.message} />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Register
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
}

export default UserSignUpForm;