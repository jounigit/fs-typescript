import { FC } from 'react';
import {
    assertNever,
    type Entry,
    type HealthCheckEntry,
    type HospitalEntry,
    type OccupationalHealthcareEntry
} from '../types';
import { listCodes } from './helpers';
import HealthRating from './HealthRating';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const textStyle = {
    marginBottom: "1px",
    marginTop: "1px"
};
const italicStyle = {
    marginBottom: "1px",
    marginTop: "1px",
    fontStyle: "italic"
};

const HealthCheck: FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <div>
            <p style={textStyle}>{entry.date} <MedicalServicesIcon /></p>
            <p style={italicStyle}>{entry.description}</p>
            {HealthRating(entry.healthCheckRating)}
            {entry.diagnosisCodes && listCodes(entry.diagnosisCodes)}
            <p style={textStyle}>diagnose by {entry.specialist}</p>
        </div>
    );
};

const Hospital: FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <div>
            <p style={textStyle}>{entry.date} <LocalHospitalIcon /></p>
            <p style={italicStyle}>{entry.description}</p>
            {entry.diagnosisCodes && listCodes(entry.diagnosisCodes)}
            <p style={textStyle}>diagnose by {entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcare: 
    FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
        return (
        <div>
            <p style={textStyle}>{entry.date} <MedicalInformationIcon /></p>
            <p style={italicStyle}>{entry.description}</p>
            { entry.diagnosisCodes && listCodes(entry.diagnosisCodes) }
            <p style={textStyle}>diagnose by {entry.specialist}</p>
        </div>
        );
    };

/******************************************************/
const EntryDetails: FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
        case 'Hospital':
            return <Hospital entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
        
};

export const Entries = ({entries}: {entries: Entry[]}) => {
    return (
        <div>
            {entries.map((val, index) => (
                <div key={index} style={{ border: 'solid 1px', padding: '1px 5px 1px', margin: '5px'}}>
                    <EntryDetails entry={val} />
                </div>
            ))}
        </div>
    );
};
