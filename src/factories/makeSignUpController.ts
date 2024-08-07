import { SignUpController } from 'src/application/controllers/sign-up';
import { makeSignUpUsecase } from './makeSignUpUsecase';

export function makeSignUpController() {
  const usecase = makeSignUpUsecase();

  return new SignUpController(usecase);
}
