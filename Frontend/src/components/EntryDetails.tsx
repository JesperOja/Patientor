import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type){
        case "Hospital":
            return <HospitalEntry entry={entry} dischargeDate={entry.discharge.date} dischargeCriteria={entry.discharge.criteria}/>
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} employer={entry.employerName} startDate={entry.sickLeave?.startDate} endDate={entry.sickLeave?.endDate}/>
        case "HealthCheck":
            return <HealthCheckEntry health={entry} raiting={entry.healthCheckRating}/>
        default:
           return assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
export default EntryDetails;