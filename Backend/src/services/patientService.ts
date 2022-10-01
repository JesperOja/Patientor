import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const allPatients: Array<Patient> = patients as Array<Patient>;

const getEntries = (): Patient[] => {
    return allPatients;
};

const getNonSensitivesEntries = (): NonSensitivePatientEntry[] => {
    return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (
    patient: Patient
): Patient => {
    const newPatient = {
        id: uuid(),
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries
    }
    allPatients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: Entry): Entry => {

    switch (entry.type) {
        case "Hospital":
            const newEntry = {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                discharge: entry.discharge,
                description: entry.description,
                diagnosisCodes: entry.diagnosisCodes
            }
            return newEntry;
        case "OccupationalHealthcare":
            const newOccuEntry = {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                employerName: entry.employerName,
                description: entry.description,
                sickLeave: entry.sickLeave,
                diagnosisCodes: entry.diagnosisCodes
            }
            return newOccuEntry;
        case "HealthCheck":
            const newHealthEntry = {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                description: entry.description,
                diagnosisCodes: entry.diagnosisCodes,
                healthCheckRating: entry.healthCheckRating
            }
            return newHealthEntry;
        default:
            return assertNever(entry);
        }
    };
    
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };


const updatePatients = (patient: Patient) => {
    allPatients.map(pat => {
        if(pat.id === patient.id){
            pat.dateOfBirth = patient.dateOfBirth;
            pat.entries = patient.entries;
            pat.gender = patient.gender;
            pat.name = patient.name;
            pat.occupation = patient.occupation;
            pat.ssn = patient.ssn;
        }
    })
}
export default {
    getEntries,
    addPatient,
    getNonSensitivesEntries,
    addEntry,
    updatePatients
};