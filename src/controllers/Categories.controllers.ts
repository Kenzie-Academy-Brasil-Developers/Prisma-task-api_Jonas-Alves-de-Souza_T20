import { Request, Response } from "express"
import { inject, injectable } from "tsyringe"

import { CategoryServices } from "../services"
import { AppError } from "../erros/appError"

@injectable()
export class CategoryControllers {
    constructor(@inject(CategoryServices) private categoryservices: CategoryServices){}
      
    async create (req: Request, res: Response): Promise<Response> {
        const userId = res.locals.decode.id
 
        const response = await this.categoryservices.create(
            req.body, Number(userId)
        )
        
        return res.status(201).json(response)        
    }

    async delete (req: Request, res: Response): Promise<Response> {
        
        await this.categoryservices.delete(Number(req.params.id))
        
        return res.status(204).json()        
    }
}