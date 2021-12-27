import * as Yup from 'yup';

const templateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Username is required')
      .min(1, 'Username must be at least 6 characters')
      .max(60, 'Username must not exceed 20 characters'),
    body: Yup.string()
      .required('Password is required')
      .min(10, 'Password must be at least 6 characters')
      .max(700, 'Password must not exceed 40 characters'),
});

export default templateSchema;