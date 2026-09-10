import type { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
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

  let icon;

  if (patient.gender === 'male') {
    icon = <MaleIcon />;
  } 
  if (patient.gender === 'female') {
    icon = <FemaleIcon />;
  }
  if (patient.gender === 'other') {
    icon = <TransgenderIcon />;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patient.name} {icon}</p>
      {/* <p>Gender: {patient.gender}</p> */}
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Entries: {patient.entries.length}</p>
    </div>
  );
};

export default PatientPage;
