export type Request = {
  body: Record<string, unknown>
  params: Record<string, string>
  accountId?: string
}

export type Response = {
  body: Record<string, unknown> | Record<string, unknown>[] | null
  statusCode: number,
}

export interface IController {
  handle(request: Request): Promise<Response>
}
