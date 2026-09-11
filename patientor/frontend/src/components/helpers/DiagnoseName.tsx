import { JSX, useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

export function DiagnosisName({ code }: { code: string }): JSX.Element {
    const [diagnosis, setDiagnosis] = useState<Diagnosis>();

    useEffect(() => {
        findDiagnosis(code).then(setDiagnosis);
    }, [code]);

    return <>{diagnosis?.name}</>;
}

async function findDiagnosis(code: string) {
    const diagnosesList = await diagnosesService.getAll();
    const diagnose = diagnosesList.find((d) => d.code === code) as Diagnosis;
    return diagnose;
}