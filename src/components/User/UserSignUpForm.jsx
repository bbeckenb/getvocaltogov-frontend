import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Alert from '../Common/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../validationSchemas/registerSchema';
import {Card, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserSignUpForm = function () {
    const { signup } = useContext(UserContext);
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
                            <select
                                aria-label="state"
                                name="state"
                                placeholder="state"
                                type="text"
                                {...register('state')}
                                className={`form-control ${errors.state ? 'is-invalid' : ''}`}>
                                    <option value={null}>None</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                             </select>
                            
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
                            <button
                                    type="button"
                                    onClick={() => history.push('/')}
                                    className="btn btn-info float-left"
                                >
                                    Go Home
                                </button>
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