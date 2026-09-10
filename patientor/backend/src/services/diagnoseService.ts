import diagnoseData from '../../data/diagnoses.ts' with { type: 'json' };
import type { Diagnosis } from '../types.ts';

const diagnoses: Diagnosis[] = diagnoseData;

const getDiagnoses = () => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
    getDiagnoses,
    addDiagnose
};