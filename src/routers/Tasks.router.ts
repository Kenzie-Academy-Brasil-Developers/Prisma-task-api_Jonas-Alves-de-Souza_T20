import { Router } from "express"

import { TasksControllers } from "../controllers"
import { TaskSchema } from "../schemas"
import { 

    IsTaskCategoryIdValid, 
    IsTaskIdValid, 
    ValidateBody,
    userAuth
    
 } from "../middlewares"
import { container } from "tsyringe"
import { TasksServices } from "../services"

export const TaskRouter = Router()

container.registerSingleton("TasksServices", TasksServices)
const taskControllers = container.resolve(TasksControllers)

TaskRouter.post(

    "/", 
    IsTaskCategoryIdValid.execute,
    ValidateBody.execute(TaskSchema),
    userAuth.VerifyToken,
    (req, res) => taskControllers.create(req, res)
    
)

TaskRouter.get(
    
    "/",
    userAuth.VerifyToken,
    (req, res) => taskControllers.findMany(req, res)
    
)

TaskRouter.use(

    "/:id",
    IsTaskIdValid.execute,
    userAuth.VerifyToken,
    userAuth.IsTaskOwner
)

TaskRouter.get(

    "/:id",
    (req, res) => taskControllers.findOne(req, res)

)

TaskRouter.patch(

    "/:id", 
    ValidateBody.execute(TaskSchema), 
    (req, res) => taskControllers.update(req, res)

)

TaskRouter.delete(

    "/:id", 
    (req, res) => taskControllers.delete(req, res)

)

