import * as yup from 'yup';
import { REGEX } from '../constants/constants';
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
  location: yup.string().required(IS_REQUIRED('Location')),
  profile_picture: yup.string(),
});

export { validationSchemaSignup, validationSchemaLocation };
