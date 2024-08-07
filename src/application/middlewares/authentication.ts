import { verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { Data, IMiddleware, Request, Response } from '../interfaces/IMiddleware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: Request): Promise<Response | Data> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        body: {
          error: 'Invalid access token.'
        },
        statusCode: 401,
      };
    }

    try {
      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer') {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret);

      return {
        data: {
          accountId: payload.sub
        }
      };
    } catch {
      return {
        body: {
          error: 'Invalid access token.'
        },
        statusCode: 401,
      };
    }
  }
}
