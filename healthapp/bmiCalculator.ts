
interface CalculateValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

export const calculateBmi = (pituus: number, paino: number) => {
    pituus = pituus * 0.01;
    const bmi = paino / ( pituus * pituus );
    const result = 25 <= bmi ? 'Overweight' : 19 <= bmi ? 'Normal' : 'Underweight';
    console.log(result);
    return result + ' range';
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
      const { value1, value2 } = parseArguments(process.argv);
      console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
  }
}


