import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the joke is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/jokes/${id}`).send().expect(404);
});

it('returns the joke if the joke is found', async () => {
  const title = 'joke';

  const response = await request(app)
    .post('/api/jokes')
    .send({ title })
    .expect(201);

  const jokeResponse = await request(app)
    .get(`/api/jokes/${response.body.id}`)
    .send()
    .expect(200);

  expect(jokeResponse.body.title).toEqual(title);
});
