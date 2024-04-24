import jwt, { verify } from "jsonwebtoken"

import { 

    NextFunction, 
    Request, 
    Response 
    
} from "express"

import { AppError } from "../erros/appError"
import { jwtConfig } from "../configs"
import { prisma } from "../database/prisma"

class userAuthentication{

    VerifyToken = (
            
            req: Request, 
            res: Response, 
            next: NextFunction
            
        ) => {
            const authorization = req.headers.authorization
    
            if (!authorization) {
                throw new AppError(401, "Token is required")
            }
            
            const token = authorization.replace("Bearer ", "")
    
            try {
                     
                const { secret } = jwtConfig()
                const decoded = verify(token, secret)
                res.locals.decode = decoded                           
                next()
    
            } catch (error) {
    
                if (error instanceof jwt.JsonWebTokenError) {
                    throw new AppError(401, "Token is invalid")
                } if (error instanceof jwt.TokenExpiredError) {
                    throw new AppError(401, "Token expired")
                } else {
                    throw new AppError(500, "Token verification error")
                }
    
            }
    }

    IsTaskOwner = async (
                
                req: Request, 
                res: Response, 
                next: NextFunction
        
            ) => {
        
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

    IsCategoryOwner = async (
            
            req: Request, 
            res: Response, 
            next: NextFunction
    
        ) => {
    
            const categoryId = req.params.id
            const userId = res.locals.decode?.id
            
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

export const userAuth = new userAuthentication()