import express, { Request, Response } from 'express';
import { SignUpController } from '../application/controllers/sign-up';
import { SignUpUsecase } from '../application/usecases/sign-up';

const app = express()

app.use(express.json())

app.post('/sign-up', async (request: Request, response: Response) => {
  const usecase = new SignUpUsecase()
  const controller = new SignUpController(usecase)

  const { statusCode, body } = await controller.handle({ body: request.body })

  response.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001')
})
