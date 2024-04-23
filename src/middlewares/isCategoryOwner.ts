import jwt from "jsonwebtoken"
import { 
    NextFunction, 
    Request, 
    Response 
} from "express"

import { AppError } from "../erros/appError"
import { prisma } from "../database/prisma"

export class IsCategoryOwner {
    static async execute(
        
        req: Request, 
        res: Response, 
        next: NextFunction

    ) {

        const categoryId = req.params.id
        const userId = res.locals.decode?.id

        if(!userId){
            throw new AppError(401, "Token is required")
        }

        
        try {
            
            const category = await prisma.category.findFirst(
                {  where: {id: Number(categoryId)}, }
            )
            
            if (!category) {
                throw new AppError(404, "category not found");
            }

            if (category?.userId !== userId) {
                throw new AppError(403, "This user is not the category owner")
            }

            next()
        } catch (error) {
            console.error('Error:', error)

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }   
                   
            throw new AppError(500, "Internal Server Error")
        }
    }

}