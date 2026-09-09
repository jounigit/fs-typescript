import { z } from "zod";


export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  // entries: z.array(z.object({}))
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface NewPatientEntry extends NewPatient {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;