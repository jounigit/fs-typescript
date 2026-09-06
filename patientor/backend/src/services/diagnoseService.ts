import diagnoseData from '../../data/diagnoses.ts' with { type: 'json' };
import type { Diagnose } from '../types.ts';

const diagnoses: Diagnose[] = diagnoseData;

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