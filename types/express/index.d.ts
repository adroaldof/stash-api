export {}

declare global {
  namespace Express {
    export interface Request {
      userUuid?: string
    }
  }
}
