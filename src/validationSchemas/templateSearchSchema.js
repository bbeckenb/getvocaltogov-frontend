import * as Yup from 'yup';

const templateSearchSchema = Yup.object().shape({
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
  },
  [
    ['title', 'title'],
    ['body', 'body'],
  ]
);

export default templateSearchSchema;