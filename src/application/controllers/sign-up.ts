import { z, ZodError } from 'zod';
import { AccountAlreadyExists } from '../errors/accounts-already-exists';
import { IController, Request, Response } from '../interfaces/IController';
import { SignUpUsecase } from '../usecases/sign-up';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8)
});

export class SignUpController implements IController {
  constructor(private readonly usecase: SignUpUsecase) { }

  async handle({ body }: Request): Promise<Response> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.usecase.execute({ email, name, password });

      return {
        body: null,
        statusCode: 204,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          body: error.issues as unknown as Record<string, unknown>[],
          statusCode: 400,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          body: {
            error: 'This e-mail is already in use.'
          },
          statusCode: 409,
        };
      }

      throw error;
    }
  }
}
