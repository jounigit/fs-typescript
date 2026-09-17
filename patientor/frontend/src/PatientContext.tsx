import { createContext, ReactNode, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Patient } from './types';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import patientService from "./services/patients";

type ContextProviderProps = {
    children?: ReactNode
}

const PatientContext = createContext<{
    patients: Patient[];
    setPatients: Dispatch<SetStateAction<Patient[]>>;
} | null>(null);

export default PatientContext;

export const PatientContextProvider = ({ children }: ContextProviderProps) => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
        const patients = await patientService.getAll();
        setPatients(patients);
        };
        void fetchPatientList();
    }, []); 
    
    return (
        <PatientContext.Provider value={{ patients, setPatients }}>
            { children }
        </PatientContext.Provider>
    );
};