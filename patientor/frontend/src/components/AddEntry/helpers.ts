import { Diagnosis, HealthCheckRating, Patient, TypeOfEntry } from "../../types";
 
export interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnosis: Diagnosis[]
}

export interface TypeOption {
  value: TypeOfEntry;
  label: string;
}

export interface HealthCheckOption {
  value: HealthCheckRating;
  label: string;
}

export interface DiagnosisOption {
  value: Diagnosis['code'];
  label: string;
}

export const typeOptions: TypeOption[] = [
  { value: TypeOfEntry.HealthCheck, label: "Health Check" },
  { value: TypeOfEntry.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: TypeOfEntry.Hospital, label: "Hospital" },
];

export const healthCheckOptions: HealthCheckOption[] = [
  { value: 0, label: '0 - Healthy' },
  { value: 1, label: '1 - LowRisk' },
  { value: 2, label: '2 - HighRisk' },
  { value: 3, label: '3 - CriticalRisk' },
];

export const WrapDivStyle = {
  border: "0.15rem dotted",
  borderRadius: "0.6rem",
  marginTop: "20px",
  padding: "0 20px 20px",
  width: "500px",
};
