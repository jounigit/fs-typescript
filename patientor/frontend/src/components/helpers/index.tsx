import { JSX, } from "react";
import { Diagnosis } from "../../types";
import { DiagnosisName } from "./DiagnoseName";

export function listCodes(codes: Array<Diagnosis['code']>): JSX.Element {
    return (
        <>
            {codes.map((code, i) => {
                return (
                    <ul key={i}>
                        <li style={{marginBottom: '-1rem'}}>
                            {code} <DiagnosisName code={code} />
                        </li>
                    </ul>
                );
            })}
        </>
    );
}

