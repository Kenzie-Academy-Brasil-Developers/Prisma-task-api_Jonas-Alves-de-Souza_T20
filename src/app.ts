import express, { json } from "express"
import helmet from "helmet"
import { CategoryRouter, TaskRouter } from "./routers"
import { HandleErrors } from "./middlewares"

export const app = express()

app.use(helmet())
app.use(json())

app.use("/tasks", TaskRouter)
app.use("/categories", CategoryRouter)

app.use(HandleErrors.execute)