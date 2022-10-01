import { Entry } from "../types";

interface Props {
    entry: Entry;
    dischargeDate: string;
    dischargeCriteria: string;
}

const HospitalEntry: React.FC<Props> = ({entry, dischargeDate, dischargeCriteria}) => {
    return (
        <>
            <div>{entry.date} {entry.type}</div>
            <p>{entry.description}</p>
            <p>Discharge date: {dischargeDate}, Criteria: {dischargeCriteria}</p>
            <p>diagnose by {entry.specialist}</p>
        </>
    )
}

export default HospitalEntry;