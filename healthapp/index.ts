import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmiValue = calculateBmi(heightNum, weightNum);
  res.json({
    weight: weightNum,
    height: heightNum,
    bmi: bmiValue
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some((exercise: any) => typeof exercise !== 'number')) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const targetNum = Number(target);
  const dailyExercisesNum = daily_exercises.map((exercise: string) => Number(exercise));

  if (isNaN(targetNum) || dailyExercisesNum.some(isNaN)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const argsToCalculate = [targetNum, ...dailyExercisesNum];

  const result = calculateExercises(argsToCalculate);
  res.json(result);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});