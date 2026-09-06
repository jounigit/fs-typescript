import express, { type Response } from 'express';
import patientService from '../services/PatientService.ts';
import type { NonSensitivePatient } from '../types.ts';
import parseNewPatient from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;

  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const newPatient = patientService.addPatient({ 
  //   name, 
  //   dateOfBirth, 
  //   ssn, 
  //   gender, 
  //   occupation 
  // });
  
  // res.send(newPatient);