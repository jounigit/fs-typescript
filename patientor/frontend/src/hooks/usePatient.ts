import { useContext } from "react";
import PatientContext from "../PatientContext";

const usePatient = () => useContext(PatientContext);

export default usePatient;