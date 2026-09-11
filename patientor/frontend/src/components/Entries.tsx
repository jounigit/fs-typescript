import { FC } from 'react';
import type {
    Entry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry
} from '../types';
import { listCodes } from './helpers';

const HealthCheck: FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <div>
            <p>{entry.date} {entry.description}</p>
            {entry.diagnosisCodes && listCodes(entry.diagnosisCodes)}
        </div>
    );
};

const Hospital: FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <div>
            <p>{entry.date} {entry.description}</p>
            {entry.diagnosisCodes && listCodes(entry.diagnosisCodes)}
        </div>
    );
};

const OccupationalHealthcare: 
    FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
        return (
        <div>
            <p>{entry.date} {entry.description}</p>
            {
                entry.diagnosisCodes 
                && listCodes(entry.diagnosisCodes) 
            }
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
    }
        
};

export const Entries = ({entries}: {entries: Entry[]}) => {
    return (
        <>
            {entries.map((val, index) => (
                <div key={index}>
                    <EntryDetails entry={val} />
                </div>
            ))}
        </>
    );
};
