import { SignInController } from '../application/controllers/sign-in';
import { makeSignInUsecase } from './makeSignInUsecase';

export function makeSignInController() {
  const usecase = makeSignInUsecase();

  return new SignInController(usecase);
}
