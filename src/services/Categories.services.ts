import { prisma } from "../database/prisma"
import { typeCreateCategory, typePromiseCategory, typeCaregoryList } from "../schemas"

export class CategoryServices{
    async create (body: typeCreateCategory): Promise<typePromiseCategory>{
        const data = await prisma.category.create({ data: body })

        return data
    }

    async delete (id: number): Promise<void>{
        await prisma.category.delete({where: {id}})        
    }
}