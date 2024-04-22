import { 
    NextFunction, 
    Request, 
    Response 
} from "express"

import { prisma } from "../database/prisma"

export class IsCategoryIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const category = await prisma.category.findFirst({
            where: { id: Number(id) },
        })

        /* console.log(category) */

        if(!category){
            return res.status(404).json({ message: "Category not found"})
        }

        res.locals = {...res.locals, category } 

        return next()
    }
}
