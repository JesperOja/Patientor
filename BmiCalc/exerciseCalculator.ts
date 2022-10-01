interface Results {
    periodLenght: number,
    trainingDays: number,
    success: boolean,
    raiting: number,
    raitingDescription: string,
    target: number,
    average: number
}

export const parseArgs = (args: Array<string>): Array<number> =>{
    if (args.length < 1) throw new Error('Not enough arguments');

    const a: Array<number> = args.map(t => Number(t));
    if(!a.includes(NaN)) return a;
    else{
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercise = (a:Array<number>, target: number): Results => {
    let trainingDays = 0;
    const average = a.reduce((total, n) => {
        if(n>0) trainingDays++;
        return total + n;
    },0) /a.length;

    let success = false;
    if(average > target) success = true;

    let raiting = 1;
    let raitingDescription = "Long way to go still, keep at it!";
    if(success) {
        raiting = 3;
        raitingDescription = "Great job!";
    }
    else if(average/target > 0.5) {
        raiting = 2;
        raitingDescription = "Going great, there is still room for improvment";
    }
    return {
        periodLenght: a.length,
    trainingDays: trainingDays,
    success: success,
    raiting: raiting,
    raitingDescription: raitingDescription,
    target: target,
    average: average
    };
};

try{
    const target = Number(process.argv[2]);
    const a: Array<string> = process.argv.slice(3);
    const b: Array<number> = parseArgs(a);
    console.log(calculateExercise(b, target));
}catch(error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
