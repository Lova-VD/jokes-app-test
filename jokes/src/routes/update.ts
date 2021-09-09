import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@villagedukaan/common';
import { Joke } from '../models/joke';

const router = express.Router();

router.put(
  '/api/jokes/:id',
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const joke = await Joke.findById(req.params.id);

    if (!joke) {
      throw new NotFoundError();
    }

    joke.set({
      title: req.body.title,
    });

    await joke.save();

    res.send(joke);
  }
);

export { router as updateJokeRouter };
