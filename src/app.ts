import "reflect-metadata"
import "dotenv/config"
import "express-async-errors"

import express, { json } from "express"
import helmet from "helmet"
import cors from "cors"

import { CategoryRouter, TaskRouter, UserRouter } from "./routers"
import { HandleErrors } from "./middlewares"

export const app = express()

app.use(helmet())
app.use(cors())
app.use(json())

app.use("/users", UserRouter)
app.use("/tasks", TaskRouter)
app.use("/categories", CategoryRouter)

app.use(HandleErrors.execute)
