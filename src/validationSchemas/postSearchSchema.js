import * as Yup from 'yup';
import { usaStates, category } from './longVars';

const postSearchSchema = Yup.object().shape({
    title: Yup.string()
        .nullable()
        .notRequired()
        .when('title', {
            is: (value) => value?.length,
            then: (rule) => rule.max(60, 'Title must not exceed 60 characters'),
    }),
    body: Yup.string()
        .nullable()
        .notRequired()
        .when('body', {
            is: (value) => value?.length,
            then: (rule) => rule.max(700, 'Body must not exceed 60 characters'),
    }),  
    location: Yup.string()
        .nullable()
        .notRequired()
        .when('location', {
            is: (value) => value?.length,
            then: (rule) => rule.oneOf(usaStates),
    }),
    tag: Yup.string()
        .nullable()
        .notRequired()
        .when('tag', {
        is: (value) => value?.length,
        then: (rule) => rule.oneOf(category),
    }),

    },
  [
    ['title', 'title'],
    ['body', 'body'],
    ['location', 'location'],
    ['tag', 'tag'],
  ]
);

export default postSearchSchema;