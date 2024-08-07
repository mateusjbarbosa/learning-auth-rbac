import { ListUsersController } from '../application/controllers/list-users';
import { makeListUsersUsecase } from './makeListUsersUsecase';

export function makeListUsersController() {
  const usecase = makeListUsersUsecase();

  return new ListUsersController(usecase);
}
