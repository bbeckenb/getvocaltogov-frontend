import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext'
import Alert from '../Common/Alert';
import registerSchema from '../../validationSchemas/registerSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserEditForm = function () {
    const { editUser, currUser } = useContext(UserContext);
    console.log(currUser)
    const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
    const [userFormData, setUserFormData] = useState();

    useEffect(function loadFormData() {
        if (currUser !== null) {
            const INIT_STATE = { 
                username: currUser.username, 
                firstName: currUser.firstName, 
                lastName: currUser.lastName, 
                street: currUser.street, 
                city: currUser.city, 
                state: currUser.state, 
                zip: currUser.zip, 
                email: currUser.email, 
                password: '' }
            setUserFormData(INIT_STATE);
            reset(INIT_STATE);
        }
    }, [currUser]);
  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({resolver: yupResolver(registerSchema)});

    async function onSubmit(formData) {
        const res = await editUser(formData);
        if (res.success) {
            setFormMessage({type: 'success', message: 'success!'});
        } else {
            console.log(res)
            setFormMessage({type: 'danger', message: `${res.error}`});
        }
    }

    function resetFormAndMsg() {
        setFormMessage({type: 'primary', message: 'welcome!'});
        reset(userFormData);
    }

    return (
        <Container>
        <Row className="justify-content-lg-center">
            <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
            <Card.Body>
                <Card.Title className="font-weight-bold text-center" role="heading">
                Edit Template!
                </Card.Title>
                <div className="edit-profile-form">
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

                        <div className="form-group">
                            <label>Confirm changes with your password</label>
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
                        Edit User
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

export default UserEditForm;
