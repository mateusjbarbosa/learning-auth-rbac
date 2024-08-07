import { hash } from 'bcryptjs';
import { prismaClient } from '../../database/prismaClient';
import { AccountAlreadyExists } from '../errors/accounts-already-exists';

type Input = {
  name: string
  email: string
  password: string
}

type Output = void

export class SignUpUsecase {
  async execute({ email, name, password }: Input): Promise<Output> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email }
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }
}
