import { injectable } from "tsyringe"

import { prisma } from "../database/prisma"
import { 
    typePromiseTask, 
    typeCreateTask, 
    typeUpdateTask, 
    typeTaskCategorySchema 
} from "../schemas"

@injectable()
export class TasksServices {

    async create(

        body: typeCreateTask, 
        userId: number

    ): Promise<typePromiseTask> {

        const data = await prisma.task.create(
            { 
                data: {
                    ...body,
                    userId
                } 
            }
        ) 

        return data
    }

    async findMany(

        userId: number, 
        categoryName?: string | undefined

    ): Promise <typeTaskCategorySchema[]> {

        if (categoryName) {

                const data = await prisma.task.findMany(
                    {
                        where: { 

                            userId: { equals: userId }, 
                            category: { name: { equals: categoryName, mode: "insensitive"} }

                        },
                        orderBy: { id: "asc" },
                        include: { category: true }
                    }
                )
    
                return data
        }
            
        const data = await prisma.task.findMany(
                {
                    where: { userId: { equals: userId } },
                    orderBy: { id: "asc" },
                    include: { category: true }
                }
        )

        return data
    }
    
    async findOne(id: number): Promise <typeTaskCategorySchema> {
        const data = await prisma.task.findFirst(
            { 
                where: { id }, 
                include: { category: true} 
            }
        )
        
        return data as typePromiseTask
    }
    
    async update(

        id: number, 
        body: typeUpdateTask

    ): Promise <typePromiseTask> {

        const data = await prisma.task.update(
            { 
                where: { id }, 
                data: body
            }
        )

        return data
    }
    
    async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } })
    }
}