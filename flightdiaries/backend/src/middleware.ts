import { type Request, type Response, type NextFunction } from 'express';
import { NewEntrySchema } from './types.ts';
import { z } from 'zod';

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    if (error.issues.some((issue) => issue.path[0] === 'visibility')) {
      res.status(400).send({ message: 'Error: Incorrect visibility' });
      return;
    }
    if (error.issues.some((issue) => issue.path[0] === 'weather')) {
      res.status(400).send({ message: 'Error: Incorect weather' });
      return;
    }

    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
