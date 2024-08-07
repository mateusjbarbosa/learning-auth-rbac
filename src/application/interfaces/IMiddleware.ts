export type Data = {
  data: Record<string, unknown>
}

export type Request = {
  headers: Record<string, string>
}

export type Response = {
  body: Record<string, unknown> | Record<string, unknown>[] | null
  statusCode: number,
}

export interface IMiddleware {
  handle(request: Request): Promise<Response | Data>
}
