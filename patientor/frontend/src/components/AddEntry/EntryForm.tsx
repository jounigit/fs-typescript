import { Alert, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { HealthCheckRating, NewPatientEntry, Patient, TypeOfEntry } from "../../types";
import React, { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

interface TypeOption {
  value: TypeOfEntry;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: TypeOfEntry.HealthCheck, label: "Health Check" },
  { value: TypeOfEntry.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: TypeOfEntry.Hospital, label: "Hospital" },
];

const WrapDivStyle = {
  border: "0.15rem dotted",
  borderRadius: "0.6rem",
  marginTop: "20px",
  padding: "0 20px 20px",
  width: "500px",
};

const EntryForm = ({ patientId, setPatient }: Props) => {
  const [entryType, setEntryType] = useState<TypeOfEntry>(TypeOfEntry.HealthCheck);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState<string>();

  const onTypeChange = (event: SelectChangeEvent<TypeOfEntry>) => {
    const selectedType = event.target.value as TypeOfEntry;
    setEntryType(selectedType);
  };

  const onHealthCheckRating = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        event.preventDefault();
        const selected = Number(event.target.value)  as HealthCheckRating;
        setHealthCheckRating(selected);
    };

  // configure diagnosisCodesInput to right form
  const diagnosisCodes = diagnosisCodesInput
      .split(',')
      .map((code) => code.trim())
      .filter(Boolean);

  const resetForm = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodesInput("");
    setHealthCheckRating(0);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEntryType(TypeOfEntry.HealthCheck);
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);

    try {
      let newEntry: NewPatientEntry;

      if (entryType === TypeOfEntry.HealthCheck) {
        newEntry = {
          type: "HealthCheck",
          date,
          description,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        };
      } else if (entryType === TypeOfEntry.OccupationalHealthcare) {
        newEntry = {
          type: "OccupationalHealthcare",
          date,
          description,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: sickLeaveStartDate || sickLeaveEndDate
            ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
            : undefined,
        };
      } else {
        newEntry = {
          type: "Hospital",
          date,
          description,
          specialist,
          diagnosisCodes,
          discharge: dischargeDate || dischargeCriteria
            ? { date: dischargeDate, criteria: dischargeCriteria }
            : undefined,
        };
      }

      const updatedPatient = await patientService.createEntry(patientId, newEntry);
      setPatient(updatedPatient);
      resetForm();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add entry.");
    }
  };

  return (
    <div style={WrapDivStyle}>
      <form onSubmit={addEntry}>
        <h3>New Entry</h3>
        {error && <Alert severity="error">{error}</Alert>}

        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          id="entry-type"
          required
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <div style={{margin: '8px 0'}}>
          <TextField
            label="Date"
            fullWidth
            required
            id="date"
            size="small"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div style={{margin: '8px 0'}}>
          <TextField
            label="Description"
            fullWidth
            required
            id="description"
            size="small"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>

        <div style={{margin: '8px 0'}}>
          <TextField
            label="Specialist"
            fullWidth
            required
            id="specialist"
            size="small"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>

        <div style={{margin: '8px 0'}}>
          <TextField
            label="Diagnosis Codes (comma-separated)"
            fullWidth
            id="diagnosisCodes"
            size="small"
            value={diagnosisCodesInput}
            onChange={({ target }) => setDiagnosisCodesInput(target.value)}
          />
        </div>

        {entryType === TypeOfEntry.HealthCheck && (
          <div style={{ margin: "20px 0" }}>
            <label>Health Check Rating (0-3)</label>
            <select value={healthCheckRating}  onChange={onHealthCheckRating} required>
              <option value={0}>Healthy</option>
              <option value={1}>LowRisk</option>
              <option value={2}>HighRisk</option>
              <option value={3}>CriticalRisk</option>
            </select>
          </div>
        )}

        {entryType === TypeOfEntry.OccupationalHealthcare && (
          <>
            <div style={{margin: '8px 0'}}>
              <TextField
                label="Employer name"
                fullWidth
                required
                id="employerName"
                size="small"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <div style={{margin: '8px 0'}}>
              <TextField
                label="Sick leave start date"
                fullWidth
                id="sickLeaveStartDate"
                size="small"
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
            </div>
            <div style={{margin: '8px 0'}}>
              <TextField
                label="Sick leave end date"
                fullWidth
                id="sickLeaveEndDate"
                size="small"
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </div>
          </>
        )}

        {entryType === TypeOfEntry.Hospital && (
          <>
            <div style={{margin: '8px 0'}}>
              <TextField
                label="Discharge date"
                fullWidth
                id="dischargeDate"
                size="small"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </div>
            <div style={{margin: '8px 0'}}>
              <TextField
                label="Discharge criteria"
                fullWidth
                id="dischargeCriteria"
                size="small"
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </div>
          </>
        )}

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
            <Button
              color="inherit"
              variant="contained"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
