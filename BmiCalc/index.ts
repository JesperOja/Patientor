import express  from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise, parseArgs } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi(height,weight);
    if(isNaN(height) || isNaN(weight)){
        res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: "malformatted parameters"}));
    }else{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ height: height,
     weight: weight,
    bmi:bmi}));
}
});

app.post('/exercise', (req, res) =>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const b: Array<number> = daily_exercises.map((t: any) => Number(t));
    if(daily_exercises === undefined || target === undefined){
        res.end(JSON.stringify({error: "parameters missing"}))
    }else if(b.includes(NaN)){
        res.end(JSON.stringify({error:"Malformatted parameters"}))
    }else{
    const data = parseArgs(daily_exercises);
    const result = calculateExercise(data, Number(target));
    res.end(JSON.stringify(result));
}
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});