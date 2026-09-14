import patientData from '../../data/patients.ts' with { type: 'json' };
import type { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types.ts';
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

const addEntry = (id: string, entry: NewEntry): Patient| undefined => {
  const patient = patients.find((patient) => patient.id === id);

  if(patient === undefined) return undefined;

  const newEntry = {
    id: randomUUID(),
    ...entry
  } as Entry;

  console.log('NEW ENTRY: ', newEntry);

  patient.entries.push(newEntry);
  return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientById,
    addEntry
};