import request from 'supertest';
import { app } from '../../app';

const createJoke = () => {
  return request(app).post('/api/jokes').send({
    title: 'asdfg',
  });
};

it('can fetch a list of jokes', async () => {
  await createJoke();
  await createJoke();
  await createJoke();

  const response = await request(app).get('/api/jokes').send().expect(200);

  expect(response.body.length).toEqual(3);
});
