import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/jokes/${id}`)
    .send({
      title: 'asadada',
    })
    .expect(404);
});

it('returns a 400 if the user provides an invalid title', async () => {
  const response = await request(app).post('/api/jokes').send({
    title: 'asadak',
  });

  await request(app)
    .put(`/api/jokes/${response.body.id}`)
    .send({
      title: '',
    })
    .expect(400);
});

it('updates the ticket if the user provides an valid title', async () => {
  const response = await request(app).post('/api/jokes').send({
    title: 'asadak',
  });

  await request(app)
    .put(`/api/jokes/${response.body.id}`)
    .send({
      title: 'new title',
    })
    .expect(200);

  const jokeResponse = await request(app)
    .get(`/api/jokes/${response.body.id}`)
    .send();

  expect(jokeResponse.body.title).toEqual('new title');
});
