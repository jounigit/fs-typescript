interface ExerciseInfo {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArgs = (args: Array<string>): number[] => {
    args.forEach( arg => {
        if (isNaN(Number(arg))) {
            throw new Error('Provided values were not numbers!');
        }
    })
    return args.map(Number);
};

const calculateExercises = (args: number[]): ExerciseInfo => {
    const target = args[0];
    args = args.slice(1);
    const periodLength = args.length;
    const trainingDays = args.filter(day => day > 0).length;
    const trainigsHours = args.reduce((sum, day) => sum + day, 0);
    const average = trainigsHours / periodLength;
    // const targetHours = periodLength * target;
    const success = average >= target;
    const rating = success ? 3 : average >= target * 0.75 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'excellent job!!!' : rating === 2 ? 'not too bad but could be better' : 'lousy job';  

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const args = parseArgs(process.argv.slice(2));
    console.log(calculateExercises(args));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}