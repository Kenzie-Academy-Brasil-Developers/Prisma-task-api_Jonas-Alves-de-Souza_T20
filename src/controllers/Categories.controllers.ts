import { Request, Response } from "express";
import { CategoryServices } from "../services";

export class CategoryControllers{
    async create (req: Request, res: Response){
        const categoryServices = new CategoryServices()

        const response = await categoryServices.create(req.body)
        
        return res.status(201).json(response)        
    }

    async delete (req: Request, res: Response){
        const categoryServices = new CategoryServices()

        await categoryServices.delete(Number(req.params.id))
        
        return res.status(204).json()        
    }
}