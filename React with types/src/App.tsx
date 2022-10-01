import Total from "./Component/Total";
import Header from "./Component/Header";
import Content from "./Component/Content";
import { CoursePart } from "./types";

const App: React.FC = () => {

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];
  const total: number = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={total} />

    </div>
  );
};

export default App;