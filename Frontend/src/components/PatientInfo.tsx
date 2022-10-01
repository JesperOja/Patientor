import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { AddEntryModal } from "../AddPatientModal";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Patient,Gender, Entry } from "../types";
import EntryDetails from "./EntryDetails";

type Params = {
    id: string;
}

const PatientInfo: React.FC = () => {
    const [, dispatch] = useStateValue();
    const {id} = useParams<Params>();
    const [pat, setPat] = React.useState<Patient>({id:"",name:"",dateOfBirth:"",ssn:"",gender:Gender.Male,occupation:"",entries:[]});
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

    React.useEffect(() => {
        const getPatient = async () =>{
            try{
            const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            
            setPat(patient)
        }catch (e) {
        console.error(e);
      }
        }
        void getPatient();
        
const getDiagnoses = async () => {
    try{
        const {data: diagnose} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch({type: "SET_DIAGNOSES", payload: diagnose});
    }catch (e) {
    console.error(e);
  }
}
        void getDiagnoses();
    },[dispatch])

    const submitNewEntry = (values: EntryFormValues) => {
        const updateEntry = async () => {
          try {
            console.log(values);
          const { data: newEntry } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          
          setPat(newEntry);
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
        }; 
        void updateEntry();
      };
    
    return(
        <>  
         
            <h1>{pat.name}</h1>
            <p>gender: {pat.gender}</p>
            <p>ssn: {pat.ssn}</p>
            <p>occupation: {pat.occupation}</p>
            
            <h2>Entries</h2>
            {pat.entries.map(entry =>
                <EntryDetails entry={(entry)} />
                
                )}
            
            <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
            
        </>
    )
}

export default PatientInfo;