import { injectable } from "tsyringe"

import { prisma } from "../database/prisma"
import { 
    typeCreateCategory, 
    typePromiseCategory 
} from "../schemas"

@injectable()
export class CategoryServices {
    async create (body: typeCreateCategory, userId: number): Promise<typePromiseCategory> {
        const data = await prisma.category.create({ data: {...body, userId} })

        return data
    }

    async delete (id: number): Promise<void> {
        await prisma.category.delete({where: {id}})        
    }
}