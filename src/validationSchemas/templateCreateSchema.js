import * as Yup from 'yup';

const templateCreateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1, 'Title must be at least 1 characters')
      .max(200, 'Title must not exceed 200 characters'),
    body: Yup.string()
      .required('Body is required')
      .min(1, 'Body must be at least 1 characters')
      .max(5000, 'Body must not exceed 5000 characters'),
});

export default templateCreateSchema;