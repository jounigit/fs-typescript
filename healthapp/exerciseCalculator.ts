interface ExerciseInfo {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (target: number, args: number[]): ExerciseInfo => {
    const periodLength = args.length;
    const trainingDays = args.filter(day => day > 0).length;
    const trainigsHours = args.reduce((sum, day) => sum + day, 0);
    const average = trainigsHours / periodLength;
    const targetHours = periodLength * target;
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

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));