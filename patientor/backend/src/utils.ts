import { NewPatientSchema, type NewPatient } from "./types.ts";

const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default parseNewPatient;

// const parseNewPatient = (object: unknown): NewPatient => {
//   if (!object || typeof object !== "object") {
//     throw new Error("Incorrect or missing data");
//   }

//   if (
//     "dateOfBirth" in object &&
//     "name" in object &&
//     "ssn" in object &&
//     "gender" in object &&
//     "occupation" in object
//   ) {
//     const newPatient: NewPatient = {
//       name: z.string().parse(object.name),
//       dateOfBirth: z.string().parse(object.dateOfBirth),
//       ssn: z.string().parse(object.ssn),
//       gender: z.enum(Gender).parse(object.gender),
//       occupation: z.string().parse(object.occupation),
//     };

//     return newPatient;
//   }

//   throw new Error("Incorrect or missing data");
// };
