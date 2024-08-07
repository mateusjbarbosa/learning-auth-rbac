import { ListUsersUsecase } from '../application/usecases/list-users';

export function makeListUsersUsecase() {
  return new ListUsersUsecase();
}
