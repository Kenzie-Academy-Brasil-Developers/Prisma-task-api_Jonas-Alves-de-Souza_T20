import jwt from "jsonwebtoken"
import { 
    NextFunction, 
    Request, 
    Response 
} from "express"

import { AppError } from "../erros/appError"
import { prisma } from "../database/prisma"

export class IsTaskOwner {
    static async execute(
        
        req: Request, 
        res: Response, 
        next: NextFunction

    ) {

        const taskId = req.params.id
        const userId = res.locals.decode?.id

        
        try {
            
            const task = await prisma.task.findFirst(
                { where: {id: Number(taskId)} }
            )
            if (!task) {
                throw new AppError(404, "Task not found");
            }

            if (task?.userId !== userId) {
                throw new AppError(403, "This user is not the task owner")
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