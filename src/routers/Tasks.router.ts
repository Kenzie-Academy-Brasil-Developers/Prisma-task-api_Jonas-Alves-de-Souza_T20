import { Router } from "express"
import { TasksControllers } from "../controllers"
import { IsTaskCategoryIdValid, IsTaskIdValid, ValidateBody } from "../middlewares"
import { TaskSchema } from "../schemas"

export const TaskRouter = Router()

const taskControllers = new TasksControllers()

TaskRouter.post(
    "/", 
    ValidateBody.execute(TaskSchema),
    IsTaskCategoryIdValid.execute, 
    taskControllers.create
)
TaskRouter.get("/", taskControllers.findMany)

TaskRouter.use("/:id", IsTaskIdValid.execute)

TaskRouter.get("/:id", taskControllers.findOne)
TaskRouter.patch("/:id", ValidateBody.execute(TaskSchema), taskControllers.update)
TaskRouter.delete("/:id", taskControllers.delete)

