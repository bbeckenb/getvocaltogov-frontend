import * as Yup from 'yup';
import { usaStates } from './longVars';

const registerSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Username must not exceed 30 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must not exceed 30 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    firstName: Yup.string()
      .required('First Name is required')
      .min(1, 'First Name must be at least 1 character')
      .max(30, 'First Name must not exceed 30 characters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .min(1, 'Last Name must be at least 1 character')
      .max(30, 'Last Name must not exceed 30 characters'),
    street: Yup.string()
        .required('Street is required')
        .min(1, 'Street must be at least 1 character')
        .max(150, 'Street must not exceed 150 characters'),
    city: Yup.string()
        .required('City is required')
        .min(1, 'City must be at least 1 character')
        .max(150, 'City must not exceed 50 characters'),
    state: Yup.string()
        .required('State is required')
        .oneOf(usaStates),
    zip: Yup.string()
        .required('Zip is required')
        .min(1, 'Zip must be at least 1 character')
        .max(5, 'Zip must not exceed 5 characters'),

        
});

export default registerSchema;