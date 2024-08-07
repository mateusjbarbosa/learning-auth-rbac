import express from 'express';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeListUsersController } from '../factories/makeListUsersController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { middlewareAdapter } from './adapters/middleware';
import { routeAdapter } from './adapters/route';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get('/users',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListUsersController())
);

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
