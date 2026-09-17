import { Alert, Button, Grid, TextField } from "@mui/material";
import { HealthCheckEntryValues, HealthCheckRating } from "../../types";
import React, { SyntheticEvent, useState } from "react";

interface Props {
    onSubmit: (values: HealthCheckEntryValues) => void;
    error?: string;
}

const DivStyle = {
    border: '1px solid', 
    marginTop: '20px', 
    padding: '0 20px 20px',
    width: '500px'
};

const AddHealthCheckForm = ({ onSubmit, error }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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

    return (
        <div style={DivStyle}>
        <form onSubmit={addEntry}>
        <h3>New Health Check Entry</h3>
        {error && <Alert severity="error">{error}</Alert>}
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
        <div style={{margin: '20px 0'}}>
            <label>Health Check Rating (0-3)</label>
            <select value={healthCheckRating} onChange={(e) => onHealthCheckRating(e, setHealthCheckRating)} required>
                <option value="0">Healthy</option>
                    <option value="1">LowRisk</option>
                    <option value="2">HighRisk</option>
                    <option value="3">CriticalRisk</option>
            </select>
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

export default AddHealthCheckForm;