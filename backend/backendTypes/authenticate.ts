import { Request } from "express"

export type JWTUserPayload={
    uid:string
    email?:string
    dispalayName?:string
<<<<<<< HEAD
    [keky:string]:unknown
}
=======
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
>>>>>>> d67ada51c7e5d57581795fb4a7905a51d93189fa
export type AuthenticatedRequest = Request&{user?:JWTUserPayload}