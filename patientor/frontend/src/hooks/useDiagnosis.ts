import { useContext } from "react";
import DiagnosisContext from "../DiagnosisContext";

const useDiagnosis = () => useContext(DiagnosisContext);

export default useDiagnosis;