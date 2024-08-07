import { z, ZodError } from 'zod';
import { AccountAlreadyExists } from '../errors/accounts-already-exists';
import { IController, Request, Response } from '../interfaces/IController';
import { SignUpUsecase } from '../usecases/sign-up';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export class SignUpController implements IController {
  constructor(private readonly usecase: SignUpUsecase) { }

  async handle({ body }: Request): Promise<Response> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.usecase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues as unknown as Record<string, unknown>[]
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This e-mail is already in use.'
          }
        };
      }

      throw error;
    }
  }
}
