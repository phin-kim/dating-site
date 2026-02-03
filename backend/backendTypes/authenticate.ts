import { Request } from "express"

export type JWTUserPayload={
    uid:string
    email?:string
    dispalayName?:string
    [keky:string]:unknown
}
export type AuthenticatedRequest = Request&{user?:JWTUserPayload}