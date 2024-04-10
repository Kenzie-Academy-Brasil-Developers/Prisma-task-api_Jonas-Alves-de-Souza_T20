import { Router } from "express";
import { CategoryControllers } from "../controllers";
import { ValidateBody } from "../middlewares";
import { CategorySchema } from "../schemas";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";

export const CategoryRouter = Router()

const categoryController = new CategoryControllers()

CategoryRouter.post("/", ValidateBody.execute(CategorySchema), categoryController.create)

CategoryRouter.use("/:id", IsCategoryIdValid.execute)
CategoryRouter.delete("/:id", categoryController.delete)
