import * as Yup from 'yup';

const templateCreateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1, 'Title must be at least 1 characters')
      .max(60, 'Title must not exceed 60 characters'),
    body: Yup.string()
      .required('Body is required')
      .min(1, 'Body must be at least 1 characters')
      .max(700, 'Body must not exceed 700 characters'),
});

export default templateCreateSchema;