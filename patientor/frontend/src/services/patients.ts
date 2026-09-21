import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues, ValidationError } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: EntryWithoutId) => {
  try {
  const response = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return response.data;
  } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            console.log(error.status);
            console.error(error.response);
            throw error.response?.data ?? new Error("Error: Validation failed");
        } else {
            console.error(error);
            throw new Error("Error: unkown error.");
        }
    } 
};

export default {
  getAll, create, getById, createEntry
};

