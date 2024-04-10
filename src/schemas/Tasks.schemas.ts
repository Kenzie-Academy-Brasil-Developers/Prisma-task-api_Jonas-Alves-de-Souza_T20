import { z } from "zod"
import { categorySchema } from "./Categories.schemas"

export const taskSchema = z.object(
    {
        id: z.number().positive(),
        title: z.string(),
        content: z.string(),
        finished: z.boolean().default(false),
        categoryId: z.number().positive().nullish() 
    }
)

export const TaskSchema = taskSchema.omit(
    { 
        id: true, 
    }
)

export const TaskCategorySchema = taskSchema.omit(
    {
        categoryId: true
    }
).extend({
    category: categorySchema.nullish()
}) 

export type typeTaskCategorySchema = z.infer< typeof TaskCategorySchema>
export type typePromiseTask = z.infer<typeof taskSchema>

export type typeCreateTask = z.infer<typeof TaskSchema>
export type typeUpdateTask = Partial<typeCreateTask> 
