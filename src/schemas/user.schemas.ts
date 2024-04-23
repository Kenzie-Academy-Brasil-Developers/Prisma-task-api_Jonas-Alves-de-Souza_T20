import { z } from "zod"

import { taskSchema } from "./Tasks.schemas"
import { categorySchema } from "./Categories.schemas"

export const userSchema = z.object(
    {
        id: z.number().positive(),
        name: z.string().min(1),
        email: z.string().email().min(1),
        password: z.string().min(1),
        task: z.array(taskSchema).nullish(),
        category: z.array(categorySchema).nullish()
    }
)

export const UserSchema = userSchema.omit(
    {
        id: true,
        task: true,
        category: true,
    }
)

export const PromiseUserSchema = userSchema.omit(
    {
        task: true,
        category: true
    }
)

export const LoginUserSchema = userSchema.pick(
    {
        email: true,
        password: true
    }
)

export const  UserReturnSchema = userSchema.omit(
    {
        password: true
    }
)

export type typePromiseUserSchema = z.infer<typeof PromiseUserSchema>
export type typeCreateUser = z.infer<typeof UserSchema>
export type typeUpdateUser = Partial<typeCreateUser>

export type typeLoginUser = z.infer<typeof LoginUserSchema>
export type typeUserReturnSchema = z.infer<typeof UserReturnSchema>

export type typeLoginReturn = {
    accessToken: string
    user: typeUserReturnSchema
}
