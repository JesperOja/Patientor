import { Entry } from "../types";

interface Props{
    entry: Entry;
    employer: string;
    startDate: string | undefined;
    endDate: string | undefined;
}

const OccupationalEntry: React.FC<Props> = ({entry, employer, startDate, endDate}) => {
    if(endDate === undefined){
        endDate = '';
        startDate = '';
    }
    return(
        <>
            <div>{entry.date} {entry.type} {employer}</div>
            <p>{entry.description}</p>
            <p>Sickleave:</p>
            <div>{startDate}</div> <div>{endDate}</div>
            <p>diagnose by {entry.specialist}</p>

        </>
    )
};

export default OccupationalEntry;