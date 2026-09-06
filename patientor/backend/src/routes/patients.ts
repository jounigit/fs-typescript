import express, { type Response, type Request } from "express";
import patientService from "../services/PatientService.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import { errorMiddleware, newPatientParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
