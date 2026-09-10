import patientData from '../../data/patients.ts' with { type: 'json' };
import type { Patient, NonSensitivePatient, NewPatient } from '../types.ts';
import { randomUUID } from 'node:crypto';

const patients: Patient[] = patientData;

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

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: randomUUID(),
    ...entry,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientById
};