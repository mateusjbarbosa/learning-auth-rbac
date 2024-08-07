export type Request = {
  body: Record<string, unknown>
}

export type Response = {
  statusCode: number,
  body: Record<string, unknown> | Record<string, unknown>[] | null
}

export interface IController {
  handle(request: Request): Promise<Response>
}
