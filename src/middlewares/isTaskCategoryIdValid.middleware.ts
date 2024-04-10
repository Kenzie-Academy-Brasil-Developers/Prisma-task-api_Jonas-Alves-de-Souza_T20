import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"
import { AppError } from "../erros/appError"

export class IsTaskCategoryIdValid {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { categoryId } = req.body
        
        if(!categoryId){
            return next()
        }

        const category = await prisma.category.findFirst({
            where: { id: categoryId }
        })

        /* console.log(category) */

        if (!category) {
            return res.status(404).json({ message: "Category not found"})
        }

        return next()
    }
}