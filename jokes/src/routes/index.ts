import express, { Request, Response } from 'express';
import { Joke } from '../models/joke';

const router = express.Router();

router.get('/api/jokes', async (req: Request, res: Response) => {
  const jokes = await Joke.find({});

  res.send(jokes);
});

export { router as indexJokeRouter };
