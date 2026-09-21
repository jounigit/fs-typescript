import { Alert, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { PatientFormValues,  HealthCheckRating,  TypeOfEntry } from "../../types";
import React, { SyntheticEvent, useState } from "react";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}
interface TypeOption{
  value: TypeOfEntry;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(TypeOfEntry).map(v => ({
  value: v, label: v.toString()
}));

const DivStyle = {
    border: '1px solid', 
    marginTop: '20px', 
    padding: '0 20px 20px',
    width: '500px'
};

const EntryForm = ({ onSubmit, error }: Props) => {
    const [typeOption, setTypeOption] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
        const value = event.target.value;
        const typeOfEntry = Object.values(TypeOfEntry).find(g => g.toString() === value);
        if (typeOfEntry) {
            setTypeOption(typeOfEntry);
        }
        }
    };

    const onHealthCheckRating = (
        event: React.ChangeEvent<HTMLSelectElement>,
        setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>,
    ) => {
        const selected = event.target.value as unknown as HealthCheckRating;
        setHealthCheckRating(selected);
    };

    const onDiagnosisCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const codes = event.target.value
            .split(',')
            .map((code) => code.trim())
            .filter(Boolean);
        setDiagnosisCodes(codes);
    };

    const addEntry = (event: SyntheticEvent) => {
       event.preventDefault();
       onSubmit({
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating,
        diagnosisCodes
       });
       setDate('');
       setDescription('');
       setSpecialist('');
       setHealthCheckRating(0);
       setDiagnosisCodes([]);
    };
    console.log('TYPE OPTION::: ', typeOption);

    return (
        <div style={DivStyle}>
        <form onSubmit={addEntry}>
        <h3>New Entry</h3>
        {error && <Alert severity="error">{error}</Alert>}

        <InputLabel id="Entry type">Entry type</InputLabel>
        <Select
            labelId="Entry Type"
            id="entry-type"
            required
            fullWidth
            value={typeOption}
            onChange={onTypeChange}
        >
            {typeOptions.map(option =>
            <MenuItem
                key={option.label}
                value={option.value}
            >
                {option.label}
            </MenuItem>
            )}
        </Select>
        <div>
            <TextField
                label="Date"
                fullWidth
                required
                id="date"
                defaultValue="0000 - 00 - 00"
                size="small"
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
        </div>
        <div>
            <TextField
                label="Description"
                fullWidth
                required
                id="description"
                defaultValue="..."
                size="small"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
        </div>
        <div>
            <TextField
                label="Specialist"
                fullWidth
                required
                id="specialist"
                defaultValue="Dr"
                size="small"
                value={specialist}
                onChange={({target}) => setSpecialist(target.value)}
            />
        </div>
        <div>
            <TextField
                label="Diagnosis Codes (comma-separated"
                fullWidth
                id="diagnosisCodes"
                defaultValue="..."
                size="small"
                value={diagnosisCodes.join(', ')}
                onChange={onDiagnosisCodes}
            />
        </div>
        <div style={{margin: '20px 0'}}>
            <label>Health Check Rating (0-3)</label>
            <select value={healthCheckRating} onChange={(e) => onHealthCheckRating(e, setHealthCheckRating)} required>
                <option value="0">Healthy</option>
                    <option value="1">LowRisk</option>
                    <option value="2">HighRisk</option>
                    <option value="3">CriticalRisk</option>
            </select>
        </div>
        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        </form>
      </div>
    );
};

export default EntryForm;
