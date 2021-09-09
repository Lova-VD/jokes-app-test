import request from 'supertest';
import { app } from '../../app';
import { Joke } from '../../models/joke';

it('has a route handler listening to /api/jokes for post requests', async () => {
  const response = await request(app).post('/api/jokes').send({});

  expect(response.status).not.toEqual(404);
});

it('returns an error if an invalid title is used', async () => {
  await request(app)
    .post('/api/jokes')
    .send({
      title: '',
    })
    .expect(400);
});

it('creates a joke with valid inputs', async () => {
  let jokes = await Joke.find({});
  expect(jokes.length).toEqual(0);

  await request(app)
    .post('/api/jokes')
    .send({
      title: 'adjllasa',
    })
    .expect(201);

  jokes = await Joke.find({});
  expect(jokes.length).toEqual(1);
});
