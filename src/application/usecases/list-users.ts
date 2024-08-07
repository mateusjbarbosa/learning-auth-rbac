import { Account } from '@prisma/client';
import { prismaClient } from '../../database/prismaClient';

type Output = {
  users: Omit<Account, 'password'>[]
}

export class ListUsersUsecase {
  async execute(): Promise<Output> {
    const accounts = await prismaClient.account.findMany({ select: { email: true, id: true, name: true } });

    return {
      users: accounts
    };
  }
}
