import { 

    NextFunction, 
    Request, 
    Response 
    
} from "express"

import { prisma } from "../database/prisma"
import { AppError } from "../erros/appError"

export class IsTaskIdValid {
    static async execute(
        
        req: Request, 
        res: Response, 
        next: NextFunction

    ) {
        const id = req.params.id

        const task = await prisma.task.findFirst({
            where: { id: Number(id) },
            include: { category: true }
        })

        if(!task){
            throw new AppError(404, "Task not found")
        }

        res.locals = {...res.locals, task } 

        return next()
    }
}