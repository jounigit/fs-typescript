import type { EntryFormValues, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { Entries } from "../Entries";
import patientService from "../../services/patients";
import axios from "axios";
import { Alert, } from "@mui/material";
import AddHealthCheckForm from "../AddEntry/HealthCheckForm";
const PatientPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    void patientService.getById(id).then(setPatient);
  }, [id]);
  
  if (!patient) return <div>Loading patient...</div>;
  const icon = iconChoose(patient);
  const entries = patient.entries;

const submitNewEntry = async (values: EntryFormValues) => {
  
    try {
      const newPatient = await patientService.createEntry(id!, values);
      setPatient(newPatient);
      console.log('PATIENT::: ', patient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h1>{patient.name} {icon}</h1>
      <p style={{marginBottom: '-0.5rem'}}>SSN: {patient.ssn}</p>
      <p style={{marginBottom: '-0.5rem'}}>Occupation: {patient.occupation}</p>
      <p style={{marginBottom: '-0.5rem'}}>Date of Birth: {patient.dateOfBirth}</p>
      <AddHealthCheckForm onSubmit={submitNewEntry} />
      {error && <Alert severity="error">{error}</Alert>}
      


      <h3>entries</h3>
      <Entries entries={entries} />
    </div>
  );
};

export default PatientPage;

function iconChoose(p: Patient) {
  if (p.gender === 'female') return <FemaleIcon />;
  if (p.gender === 'male') return <MaleIcon />;
  if (p.gender === 'other') return <TransgenderIcon />;
}
