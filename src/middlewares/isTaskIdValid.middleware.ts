import { 
    NextFunction, 
    Request, 
    Response 
} from "express"

import { prisma } from "../database/prisma"

export class IsTaskIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const task = await prisma.task.findFirst({
            where: { id: Number(id) },
            include: { category: true }
        })

        /* console.log(task) */

        if(!task){
            return res.status(404).json({ message: "Task not found"})
        }

        res.locals = {...res.locals, task } 

        return next()
    }
}