import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { PatientFormValues, Patient, Entry, 
  HealthCheckEntry 
} from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import usePatient from "../../hooks/usePatient";

const PatientListPage = ( ) => {
  const { patients, setPatients } = usePatient()!;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
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
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            // {}
            <TableRow key={patient.id}>
              
              <TableCell>
                <Button component={Link} to={`/patients/${patient.id}`} variant="text">
                {patient.name}
                </Button>
              </TableCell>
              
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={true} rating={getRatingNumber(patient.entries)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;

const getRatingNumber = (entries: Entry[]): number => {
  if (!entries) {
    return 1;
  }

  const healthCheckEntries = entries.map((entry) => entry.type === 'HealthCheck');

  if (healthCheckEntries) {
    const healthCheckEntries = entries.filter(
      (entry): entry is HealthCheckEntry => entry.type === 'HealthCheck'
    );

    const rates: number[] = healthCheckEntries.map(entry => entry.healthCheckRating);
    const len = rates.length;
    const sum = rates.reduce((acc, curr) => acc + curr, 0);

    const average = sum / len;
    return Math.round(average);
  }

  return 1;
};
