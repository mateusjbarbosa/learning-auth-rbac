import { AuthenticationMiddleware } from '../application/middlewares/authentication';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
