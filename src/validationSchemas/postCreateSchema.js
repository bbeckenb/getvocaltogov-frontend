import * as Yup from 'yup';

const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
const usaStates = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
"DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
"MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
"NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
"SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
const category = ["Agriculture", "Arts and Humanities", "Banking", "Budget", "Criminal Justice", "Defense", "Economy", "Education", "Election Reform", "Energy", "Environment", "FEMA", "Finance", "Fire Arms", "Foreign Affairs", "Health Care", "Housing", "Immigration", "Interior", "Judiciary", "Labor", "Law Enforcement", "Medicare", "Presidential Personnel", "Religion", "Service Academies", "Small Business", "Social Security", "Taxes", "Telecommunications", "Trade", "Transportation", "Veterans", "Welfare"];

const postCreateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1, 'Title must be at least 1 characters')
      .max(60, 'Title must not exceed 60 characters'),
    body: Yup.string()
      .required('Body is required')
      .min(1, 'Body must be at least 1 characters')
      .max(700, 'Body must not exceed 700 characters'),
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