import { CoursePart } from "../types"
import Part from "./Part"

const Content = ({ content }: { content: CoursePart[] }) => {

    return (
        <>{content.map(part =>
            <p>{Part(part)}</p>)}</>
    )
}

export default Content