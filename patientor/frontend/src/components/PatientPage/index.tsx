import type { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { Entries } from "../Entries";
import patientService from "../../services/patients";
import EntryForm from "../AddEntry/EntryForm";
import useDiagnosis from "../../hooks/useDiagnosis";
// import AddHealthCheckForm from "../AddEntry/HealthCheckForm";

const PatientPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { diagnosis } = useDiagnosis()!;

  useEffect(() => {
    if (!id) return;
    void patientService.getById(id).then(setPatient);
  }, [id]);

  if (!patient) return <div>Loading patient...</div>;
  const icon = iconChoose(patient);
  const entries = patient.entries;

  return (
    <div>
      <h1>{patient.name} {icon}</h1>
      <p style={{marginBottom: '-0.5rem'}}>SSN: {patient.ssn}</p>
      <p style={{marginBottom: '-0.5rem'}}>Occupation: {patient.occupation}</p>
      <p style={{marginBottom: '-0.5rem'}}>Date of Birth: {patient.dateOfBirth}</p>
      {id && <EntryForm patientId={id} setPatient={setPatient} diagnosis={diagnosis} />}
      {/* {id && <AddHealthCheckForm patientId={id} setPatient={setPatient} /> } */}

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
