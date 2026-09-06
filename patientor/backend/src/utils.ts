import { Gender, type NewPatient,  } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }
  return param;
};

const isGender = (param: unknown): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param as string);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'dateOfBirth' in object &&
    'name' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation')
    };

    return newPatient;
  }

  throw new Error('Incorrect or missing data');
};

export default parseNewPatient;