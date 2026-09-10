import { JSX } from "react";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

export function listCodes(codes: Array<Diagnosis['code']>): JSX.Element {
    return (
        <>
            {codes.map((code, i) => {
                return (
                    <ul key={i}>
                        <li style={{marginBottom: '-1rem'}}>{code}</li>
                    </ul>
                );
            })}
        </>
    );
}

// const diagnosesList = async () => {
//     const res = await diagnosesService.getAll();
//     return res;
// };

export async function findDiagnosis(code: string) {
    const diagnosesList = await diagnosesService.getAll();
    if (diagnosesList.length) {
        const diagnose = diagnosesList.find((d) => d.code === code);
        return diagnose;
    }
    return;
}