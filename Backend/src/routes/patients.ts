import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../services/utils';
import { Patient } from '../types';
import { toNewEntry } from '../services/utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivesEntries());
});

router.post('/', (req, res) => {
    const newPatient = toNewPatientEntry(req.body) ;
    const newPatientEntry = patientService.addPatient(newPatient)
    res.json(newPatientEntry);
})

router.get('/:id', (req, res) => {
    const patients = patientService.getEntries();

    const patient = patients.find(n => n.id === req.params.id) as Patient;

    res.json(patient);
})

router.post('/:id/entries', (req, res) => {
    const entry = patientService.addEntry(req.body)
    const patients = patientService.getEntries();
    const patient = patients.find(n => n.id === req.params.id) as Patient;
    const newEntry = toNewEntry(entry, patient);
    
    patientService.updatePatients(newEntry);
    res.json(newEntry);
})
export default router;