import { CoursePart } from "../types";

const Part = (part: CoursePart) => {

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };


    switch (part.type) {
        case "normal":
            return (<><div><strong>{part.name}</strong> <strong>{part.exerciseCount}</strong></div>
                <div>{part.description}</div></>);

        case "groupProject":
            return (<><div><strong>{part.name}</strong> <strong>{part.exerciseCount}</strong></div>
                <div>Group project count {part.groupProjectCount}</div></>);

        case "submission":
            return (<><div><strong>{part.name}</strong> <strong>{part.exerciseCount}</strong></div>
                <div>{part.description}</div>
                <div>submit to {part.exerciseSubmissionLink}</div></>);

        case "special":
            return (<><div><strong>{part.name}</strong> <strong>{part.exerciseCount}</strong></div>
                <div>{part.description}</div>
                <div>required skills: {part.requirements[0]}, {part.requirements[1]}</div></>);
        default:
            return assertNever(part);
    };

}

export default Part;