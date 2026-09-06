import patientData from '../../data/patients.ts' with { type: 'json' };
import type { Patient, NonSensitivePatient, NewPatient } from '../types.ts';

const patients: Patient[] = patientData as Patient[];
// const patientsNonSensitive: NonSensitivePatient[] = patientData as NonSensitivePatient[];

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: String(patients.length + 1),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};