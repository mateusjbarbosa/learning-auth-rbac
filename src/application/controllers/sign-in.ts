import { z, ZodError } from 'zod';
import { InvalidCredentials } from '../errors/invalid-credentials';
import { IController, Request, Response } from '../interfaces/IController';
import { SignInUsecase } from '../usecases/sign-in';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export class SignInController implements IController {
  constructor(private readonly usecase: SignInUsecase) { }

  async handle({ body }: Request): Promise<Response> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.usecase.execute({ email, password });

      return {
        body: {
          accessToken
        },
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          body: error.issues as unknown as Record<string, unknown>[],
          statusCode: 400,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          body: {
            error: 'Invalid credentials.'
          },
          statusCode: 401,
        };
      }

      throw error;
    }
  }
}
