import { z, ZodError } from 'zod';
import { InvalidCredentials } from '../errors/invalid-credentials';
import { IController, Request, Response } from "../interfaces/IController";
import { SignInUsecase } from '../usecases/sign-in';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export class SignInController implements IController {
  constructor(private readonly usecase: SignInUsecase) { }

  async handle({ body }: Request): Promise<Response> {
    try {
      const { email, password } = schema.parse(body)

      const { accessToken } = await this.usecase.execute({ email, password })

      return {
        statusCode: 200,
        body: {
          accessToken
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues as unknown as Record<string, unknown>[]
        }
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid credentials."
          }
        }
      }

      throw error;
    }
  }
}
