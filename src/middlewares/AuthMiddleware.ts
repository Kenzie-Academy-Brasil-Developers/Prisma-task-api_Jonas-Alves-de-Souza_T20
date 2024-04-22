import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/appError";
import { jwtConfig } from "../configs";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

class AuthMidlleware{
  isAuthentication = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void => {
    const { authorization } = req.headers

    if(!authorization){
      throw new AppError(401, "Missing bearer token")
    }

    const [_, token] = authorization.split(" ")

    const { secret } = jwtConfig()
    const jwtPayload = verify(token, secret)

    
    res.locals = {
      ...res.locals,
      decoded: jwtPayload
    }
    
    return next()

  }
  
  isUserOwner = async(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    const { decoded } = res.locals
    const { userId } = req.params

    if(decoded.sub !== userId){
      throw new AppError(403, "You dont have permission to perform this action")
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(decoded.sub) }
    })

    res.locals = { ...res.locals, user }
    
    return next()
  }
}

export const auth = new AuthMidlleware()