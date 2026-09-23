import { Alert, Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { HealthCheckRating, NewPatientEntry, TypeOfEntry } from "../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import { healthCheckOptions, Props, typeOptions, WrapDivStyle } from "./helpers";
import usePatient from "../../hooks/usePatient";

const EntryForm = ({ patientId, setPatient, diagnosis }: Props) => {
  const [entryType, setEntryType] = useState<TypeOfEntry>(TypeOfEntry.HealthCheck);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState<string>();
  const { setPatients } = usePatient()!;

  const onTypeChange = (event: SelectChangeEvent<TypeOfEntry>) => {
    const selectedType = event.target.value as TypeOfEntry;
    setEntryType(selectedType);
  };

  const onHealthCheckRating = ( event: SelectChangeEvent<HealthCheckRating>) => {
    const selected = Number(event.target.value) as HealthCheckRating;
    setHealthCheckRating(selected);
    };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const selectedCodes = event.target.value;
    setDiagnosisCodesInput(
      typeof selectedCodes === "string" ? selectedCodes.split(",") : selectedCodes,
    );
  };

  const diagnosisCodes = diagnosisCodesInput;

  const resetForm = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodesInput([]);
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
      setPatients((patients) =>
        patients.map((patient) =>
          patient.id === updatedPatient.id ? updatedPatient : patient,
        ),
      );
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
      {/* *************** entry type  **********************************/}
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          id="entry-type"
          required
          fullWidth
          size="small"
          value={entryType}
          onChange={onTypeChange}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      {/* *************** date  **********************************/}
        <div style={{margin: '8px 0'}}>
          <TextField
            label="Date"
            hiddenLabel
            fullWidth
            type="date"
            required
            id="date"
            size="small"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
      {/* *************** Description  **********************************/}
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
      {/* *************** Specialist  **********************************/}
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
      {/* *************** Diagnoses  **********************************/}
        <div style={{margin: '8px 0'}}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            multiple
            fullWidth
            size="small"
            value={diagnosisCodesInput}
            onChange={onDiagnosisCodesChange}
            input={<OutlinedInput label="Multiple Select" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnosis.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                  {d.code} {d.name}
                </MenuItem>
            ))}
          </Select>
        </div>
      {/* *************** Health rating  **********************************/}
        {entryType === TypeOfEntry.HealthCheck && (
          <div style={{ margin: "20px 0" }}>
            <InputLabel id="health-check-rating-label">Health Check Rating (0-3)</InputLabel>
            <Select
              labelId="health-check-rating-label"
              label="Health Check Rating"
              id="health-check-rating-select"
              fullWidth
              size="small"
              value={healthCheckRating}
              onChange={onHealthCheckRating}
            >
              {healthCheckOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      {/* *************** Employer name  **********************************/}
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
              Add New Entry
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
