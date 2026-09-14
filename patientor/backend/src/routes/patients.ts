import express, { type Response, type Request } from "express";
import patientService from "../services/PatientService.ts";
import type { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import { errorMiddleware, NewEntryParser, newPatientParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.get("/:id", (req: Request<{ id: string }>, res: Response<Patient | { message: string }>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

router.post("/:id/entries",
  NewEntryParser, (req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Patient | { message: string }>) => {
  const patientWithNewEntry = patientService.addEntry(req.params.id, req.body);
  if (patientWithNewEntry) {
    res.json(patientWithNewEntry);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

router.use(errorMiddleware);

export default router;
