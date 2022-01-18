import * as Yup from 'yup';
import { URL, usaStates, category } from './longVars';

const postCreateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1, 'Title must be at least 1 characters')
      .max(200, 'Title must not exceed 200 characters'),
    body: Yup.string()
      .required('Body is required')
      .min(1, 'Body must be at least 1 characters')
      .max(5000, 'Body must not exceed 5000 characters'),
    location: Yup.string()
      .required('Location is required')
      .oneOf(usaStates),
    tag: Yup.string()
      .required('Tag is required')
      .oneOf(category),
    link: Yup.string()
      .nullable()
      .notRequired()
      .when('link', {
        is: (value) => value?.length,
        then: (rule) => rule.matches(URL, 'Link must be a valid url'),
      }),  
},
    [
        ['link', 'link'],
    ]
);

export default postCreateSchema;