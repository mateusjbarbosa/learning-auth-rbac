import express, { Request, Response } from 'express';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';

const app = express();

app.use(express.json());

app.post('/sign-up', async (request: Request, response: Response) => {
  const controller = makeSignUpController();

  const { statusCode, body } = await controller.handle({ body: request.body });

  response.status(statusCode).json(body);
});

app.post('/sign-in', async (request: Request, response: Response) => {
  const controller = makeSignInController();

  const { statusCode, body } = await controller.handle({ body: request.body });

  response.status(statusCode).json(body);
});

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
