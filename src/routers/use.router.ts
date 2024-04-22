import { Router } from "express"
import { container } from "tsyringe"

import { UserControllers } from "../controllers"
import { ValidateBody, VerifyToken, isEmailAlreadyRegister } from "../middlewares"
import { UserServices } from "../services/User.services"
import { LoginUserSchema } from "../schemas"

export const UserRouter = Router()

container.registerSingleton("UserServices", UserServices)
const userControllers = container.resolve(UserControllers)

UserRouter.post(

    "/",
    isEmailAlreadyRegister.execute,  
    (req, res) => userControllers.userRegister(req, res)

)
UserRouter.post(

    "/login",
    ValidateBody.execute(LoginUserSchema), 
    (req, res) => userControllers.login(req, res)

)
UserRouter.get(
    "/profile", 
    VerifyToken.execute, 
    (req, res) => userControllers.getUser(req, res)

)
