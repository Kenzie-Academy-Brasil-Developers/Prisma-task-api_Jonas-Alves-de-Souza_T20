import { Request, Response} from "express"
import { inject, injectable } from "tsyringe"

import { TasksServices } from "../services"
import { AppError } from "../erros/appError"

@injectable()
export class TasksControllers {
    constructor(@inject(TasksServices) private taskServices: TasksServices){}
   
    async create(req: Request, res: Response): Promise<Response> {
        const userId = res.locals.decode.id
        
        const response = await this.taskServices.create(req.body, Number(userId))
        
        return res.status(201).json(response)
    }

    async findMany({ query }: Request, res: Response): Promise<Response> { 
        const userId = res.locals.decode.id
        
        const queryParams = query.category ? String(query.category) : undefined   

        const response =  await this.taskServices.findMany(Number(userId), queryParams)
        
        return res.status(200).json(response)                
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const response =  await this.taskServices.findOne(Number(req.params.id))

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response): Promise<Response> {
        const response = await this.taskServices.update(Number(req.params.id), req.body)

        return res.status(200).json(response)        
    }
    
    async delete(req: Request, res: Response): Promise<Response> {
        await this.taskServices.delete(Number(req.params.id))
        
        return res.status(204).json()
    }
}