import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@villagedukaan/common';
import { Joke } from '../models/joke';

const router = express.Router();

router.post(
  '/api/jokes',
  [body('title').not().isEmpty().withMessage('Titled required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const joke = Joke.build({
      title,
    });
    await joke.save();

    res.status(201).send(joke);
  }
);

export { router as createJokeRouter };
