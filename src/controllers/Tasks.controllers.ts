import { Request, Response} from "express";
import { TasksServices } from "../services";

export class TasksControllers{
   
    async create(req: Request, res: Response){
        const taskServices = new TasksServices()
        
        const response = await taskServices.create(req.body)
        
        return res.status(201).json(response)
    }
    async findMany({ query }: Request, res: Response){ 
        const taskServices = new TasksServices()

        const queryParams = query.category ? String(query.category) : undefined        
        const response =  await taskServices.findMany(queryParams)
        
        return res.status(200).json(response)                
    }
    async findOne(req: Request, res: Response){
        const taskServices = new TasksServices()

        const response =  await taskServices.findOne(Number(req.params.id))

        return res.status(200).json(response)
    }
    async update(req: Request, res: Response){
        const taskServices = new TasksServices()

        const response = await taskServices.update(Number(req.params.id), req.body)

        return res.status(200).json(response)        
    }
    async delete(req: Request, res: Response){
        const taskServices = new TasksServices()

        await taskServices.delete(Number(req.params.id))
        
        return res.status(204).json()
    }
}