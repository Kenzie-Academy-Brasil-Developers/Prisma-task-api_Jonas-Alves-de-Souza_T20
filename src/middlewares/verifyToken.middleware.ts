import jwt from "jsonwebtoken"

import { 
    NextFunction, 
    Request, 
    Response 
} from "express"

import { AppError } from "../erros/appError"
import { jwtConfig } from "../configs"

export class VerifyToken {
    static execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization

        if (!authorization) {
            throw new AppError(401, "Token is required")
        }

        const token = authorization.replace("Bearer ", "")

        try {
            const { secret } = jwtConfig()
            const decoded = jwt.verify(token, secret)
            res.locals.decode = decoded                           
            next()
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(401, "Invalid token")
            } else if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(401, "Token expired")
            } else {
                throw new AppError(500, "Token verification error")
            }
        }
    }
}