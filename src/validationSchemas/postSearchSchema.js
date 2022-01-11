import * as Yup from 'yup';

const usaStates = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
"DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
"MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
"NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
"SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
const category = ["Agriculture", "Arts and Humanities", "Banking", "Budget", "Criminal Justice", "Defense", "Economy", "Education", "Election Reform", "Energy", "Environment", "FEMA", "Finance", "Fire Arms", "Foreign Affairs", "Health Care", "Housing", "Immigration", "Interior", "Judiciary", "Labor", "Law Enforcement", "Medicare", "Presidential Personnel", "Religion", "Service Academies", "Small Business", "Social Security", "Taxes", "Telecommunications", "Trade", "Transportation", "Veterans", "Welfare"];

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