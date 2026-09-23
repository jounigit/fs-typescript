import { JSX, } from "react";
import { Diagnosis, Discharge } from "../../types";
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

export function showDischarge(disCharge: Discharge): JSX.Element {
    return <p style={{paddingBottom: '4px'}}>Discharge: {disCharge.date} {disCharge.criteria}</p>;
}