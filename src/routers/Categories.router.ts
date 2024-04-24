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
    userAuth.VerifyToken,
    ValidateBody.execute(CategorySchema),
    (req, res) => categoryController.create(req, res)
)

CategoryRouter.use(

    "/:id", 
    userAuth.VerifyToken,
    userAuth.IsCategoryOwner,
    IsCategoryIdValid.execute
    
)
CategoryRouter.delete(

    "/:id", 
    (req, res) => categoryController.delete(req, res)

)
