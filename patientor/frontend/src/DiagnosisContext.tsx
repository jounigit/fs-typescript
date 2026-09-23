import { createContext, ReactNode, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Diagnosis } from './types';
import diagnosisService from "./services/diagnoses";

type ContextProviderProps = {
    children?: ReactNode
}

const DiagnosisContext = createContext<{
    diagnosis: Diagnosis[];
    setDiagnosis: Dispatch<SetStateAction<Diagnosis[]>>;
} | null>(null);

export default DiagnosisContext;

export const DiagnosisContextProvider = ({ children }: ContextProviderProps) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    useEffect(() => {

        const fetchPatientList = async () => {
        const diagnosis = await diagnosisService.getAll();
        setDiagnosis(diagnosis);
        };
        void fetchPatientList();
    }, []); 
    
    return (
        <DiagnosisContext.Provider value={{ diagnosis, setDiagnosis }}>
            { children }
        </DiagnosisContext.Provider>
    );
};