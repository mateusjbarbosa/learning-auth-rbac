import { SignInUsecase } from '../application/usecases/sign-in';

export function makeSignInUsecase() {
  return new SignInUsecase();
}
