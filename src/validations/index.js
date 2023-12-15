import * as yup from 'yup';
import { LIMITS, REGEX } from '../constants/constants';
import { MESSAGES } from '../constants/messages';

const { IS_REQUIRED, EMAIL_INVALID, MSG_PASSWORD_TYPE, MSG_FIELD_LENGTH } = MESSAGES;
const { EMAIL_PATTERN, PASSWORD_PATTERN } = REGEX;

const validationSchemaSignup = yup.object({
  email: yup.string().matches(EMAIL_PATTERN, EMAIL_INVALID).required(IS_REQUIRED('Email')),
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, MSG_PASSWORD_TYPE)
    .required(IS_REQUIRED('Password')),
  firstname: yup
    .string()
    .required(IS_REQUIRED('First Name'))
    .max(50, MSG_FIELD_LENGTH('First Name')),
  lastname: yup.string().required(IS_REQUIRED('Last Name')).max(50, MSG_FIELD_LENGTH('First Name')),
});

const validationSchemaLocation = yup.object().shape({
  location: yup.string(),
  profile_picture: yup.string(),
});
const validationSchemaTitle = yup.object().shape({
  title: yup.string().required(IS_REQUIRED('Title')),
});
const validationSchemaWorkIntrest = yup.object().shape({
  work: yup.string().max(6000).required(IS_REQUIRED('Work')),
});
const validationSchemaInterest = yup.object().shape({
  interest: yup.string().max(6000).required(IS_REQUIRED('interest')),
});

const validationSchemaAboutWork = yup.object().shape({
  work: yup.string().trim().required(IS_REQUIRED('work')).max(LIMITS.MAX_ABOUT_WORK_LENGTH),
});

const validationSchemaExperience = yup.object().shape({
  title: yup.string().required(IS_REQUIRED('Title')),
  description: yup.string(),
  start_date: yup.string().required(IS_REQUIRED('Start Date')),
  company: yup.string().required(IS_REQUIRED('Company Name')),
});
const validationSchemaEducation = yup.object().shape({
  school: yup.string().required(IS_REQUIRED('School Name')),
  degree: yup.string().required(IS_REQUIRED('Degree ')),
  field_of_study: yup.string().required(IS_REQUIRED('Field Of Study')),
  start_date: yup.string().required(IS_REQUIRED('Start Date')),
  end_date: yup.string().required(IS_REQUIRED('End date')),
  other: yup.string(),
});
const validationSchemaCertificate = yup.object().shape({
  title: yup.string().required(IS_REQUIRED('Title')),
  year: yup.string().required(IS_REQUIRED('Year')),
  institution: yup.string().required(IS_REQUIRED('Institution')),
});
const validationSchemaWorkSkills = yup.object().shape({
  name: yup.string().required(IS_REQUIRED('Name')),
});
const validationSchemaWorkLinks = yup.object().shape({
  domain: yup.string().required(IS_REQUIRED('Domain')),
  url: yup.string().required(IS_REQUIRED('Url')),
});

export {
  validationSchemaSignup,
  validationSchemaLocation,
  validationSchemaTitle,
  validationSchemaWorkIntrest,
  validationSchemaExperience,
  validationSchemaEducation,
  validationSchemaCertificate,
  validationSchemaInterest,
  validationSchemaWorkSkills,
  validationSchemaWorkLinks,
  validationSchemaAboutWork,
};
