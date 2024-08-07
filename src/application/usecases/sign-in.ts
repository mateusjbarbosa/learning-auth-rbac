import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { prismaClient } from "../../database/prismaClient"
import { env } from '../config/env'
import { InvalidCredentials } from "../errors/invalid-credentials"

type Input = {
  email: string
  password: string
}

type Output = {
  accessToken: string
}

export class SignInUsecase {
  async execute({ email, password }: Input): Promise<Output> {
    const account = await prismaClient.account.findUnique({
      where: { email }
    })
    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password)
    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: account.id },
      env.jwtSecret,
      { expiresIn: '1d' }
    )

    return {
      accessToken
    }
  }
}
