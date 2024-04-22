import { z } from "zod"

export type typeCaregoryList = {
    categories: Array<string>
}

export const categorySchema = z.object(
    {
        id: z.number().positive(),
        name: z.string().min(1),
    }
)

export const CategorySchema = categorySchema.omit({id: true})

export type typePromiseCategory = z.infer< typeof categorySchema>
export type typeCreateCategory = z.infer<typeof CategorySchema>