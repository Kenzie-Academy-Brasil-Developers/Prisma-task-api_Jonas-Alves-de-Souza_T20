import { Router } from "express"
import { container } from "tsyringe"

import { CategoryControllers } from "../controllers"
import {
     
    ValidateBody, 
    IsCategoryIdValid, 
    userAuth

} from "../middlewares"
import { CategorySchema } from "../schemas"
import { CategoryServices } from "../services"

export const CategoryRouter = Router()

container.registerSingleton("CategoryServices", CategoryServices)
const categoryController = container.resolve(CategoryControllers)

CategoryRouter.post(

    "/", 
    ValidateBody.execute(CategorySchema),
    userAuth.VerifyToken,
    (req, res) => categoryController.create(req, res)
)

CategoryRouter.use(

    "/:id", 
    IsCategoryIdValid.execute,
    userAuth.VerifyToken,
    userAuth.IsCategoryOwner,
    
)
CategoryRouter.delete(

    "/:id", 
    (req, res) => categoryController.delete(req, res)

)
