import { Entry, HealthCheckRating } from "../types";

interface Props{
    health: Entry;
    raiting: HealthCheckRating;
}


const HealthCheckEntry: React.FC<Props> = ({health, raiting}) => {
    
    return(
        <>
            <div>{health.date} {health.type}</div>
            <p>{health.description}</p>
            <div>Healthcheck raiting: {raiting}</div>
            <p>diagnose by {health.specialist}</p>
        </>
    )
}

export default HealthCheckEntry;