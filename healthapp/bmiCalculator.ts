const calculateBmi = (pituus: number, paino: number): string => {
    pituus = pituus * 0.01;
    const bmi = paino / ( pituus * pituus );
    const result = 25 <= bmi ? 'Overweight' : 19 <= bmi ? 'Normal' : 'Underweight';
    // console.log(result);
    return result + ` range`;
};

console.log(calculateBmi(185, 83))