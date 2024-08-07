import { SignUpUsecase } from '../application/usecases/sign-up';

export function makeSignUpUsecase() {
  return new SignUpUsecase();
}
