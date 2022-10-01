import { Patient, Gender, Entry} from "../types";


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries:Entry}

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): Patient =>{
    const newPatient: Patient = {
        id: "",
        name: parseStrings(name),
        dateOfBirth: parseStrings(dateOfBirth),
        ssn: parseStrings(ssn),
        gender: parseGender(gender),
        occupation: parseStrings(occupation),
        entries: []
    }
    return newPatient;
}

export const toNewEntry = (entry: Entry, patient: Patient): Patient => {
    const addEntry = patient.entries.concat(entry);
    console.log(addEntry);
    const newEntryToPatient: Patient = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      ssn: patient.ssn,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: addEntry
    }
    return newEntryToPatient;
}


const parseStrings = (text: unknown): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return text;
  };   

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing visibility: ' + gender);
  }
  return gender;
};


export default toNewPatientEntry;