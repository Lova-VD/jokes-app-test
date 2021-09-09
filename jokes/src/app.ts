import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@villagedukaan/common';
import { createJokeRouter } from './routes/new';
import { showJokeRouter } from './routes/show';
import { indexJokeRouter } from './routes/index';
import { updateJokeRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(createJokeRouter);
app.use(showJokeRouter);
app.use(indexJokeRouter);
app.use(updateJokeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
