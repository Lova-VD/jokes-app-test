import express, { Request, Response } from 'express';
import { NotFoundError } from '@villagedukaan/common';
import { Joke } from '../models/joke';

const router = express.Router();

router.get('/api/jokes/:id', async (req: Request, res: Response) => {
  const joke = await Joke.findById(req.params.id);

  if (!joke) {
    throw new NotFoundError();
  }

  res.send(joke);
});

export { router as showJokeRouter };
