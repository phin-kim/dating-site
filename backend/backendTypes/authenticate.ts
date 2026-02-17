import { Request } from "express"

export type JWTUserPayload={
    uid:string
    email?:string
    dispalayName?:string
    role:Role
    [key:string]:unknown
}
export type JWTTokenPayload={
    uid:string,
    role:string
}
export const ROLES ={
    USER:"user",
    ADMIN:'admin',
    MODERATOR:"moderator"
} as const
export type Role = typeof ROLES[keyof typeof ROLES]
export type AuthenticatedRequest = Request&{user?:JWTUserPayload}