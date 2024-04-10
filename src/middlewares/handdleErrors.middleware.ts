import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/appError";
import { ZodError } from "zod";

export class HandleErrors{
    static execute(error: Error, req: Request, res: Response, next: NextFunction){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({ message: error.message })
        }

        if(error instanceof ZodError){
            return res.status(400).json({ message: error.flatten().fieldErrors })
        }

        console.log(error)

        return res.status(500).json({ message: "Internal server error" })
    }
}