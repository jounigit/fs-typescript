import type { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, JSX } from "react";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { Entries } from "../Entries";

const PatientPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id as string);
        setPatient(patient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  console.log('POTILAS: ', patient.entries);

  const icon = iconChoose(patient);

  const showEntries = patient.entries.length > 0 && <Entries entries={patient.entries} />;

  return (
    <div>
      <h1>{patient.name} {icon}</h1>
      <p style={{marginBottom: '-0.5rem'}}>Occupation: {patient.occupation}</p>
      <p style={{marginBottom: '-0.5rem'}}>Date of Birth: {patient.dateOfBirth}</p>
      <p style={{marginBottom: '-0.5rem'}}>SSN: {patient.ssn}</p>
      <h3>entries</h3>
      {showEntries}
    </div>
  );
};

export default PatientPage;

function iconChoose(p: Patient) {
  if (p.gender === 'female') return <FemaleIcon />;
  if (p.gender === 'male') return <MaleIcon />;
  if (p.gender === 'other') return <TransgenderIcon />;
}
