import { IController, Request, Response } from '../interfaces/IController';
import { ListUsersUsecase } from '../usecases/list-users';

export class ListUsersController implements IController {
  constructor(private readonly usecase: ListUsersUsecase) { }

  async handle(request: Request): Promise<Response> {
    const users = await this.usecase.execute();

    return {
      body: {
        accountId: request.accountId,
        users
      },
      statusCode: 200,
    };
  }
}
