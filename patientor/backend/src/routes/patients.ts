import express from 'express';
import patientService from '../services/PatientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
