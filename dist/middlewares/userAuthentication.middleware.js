"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const appError_1 = require("../erros/appError");
const configs_1 = require("../configs");
const prisma_1 = require("../database/prisma");
class userAuthentication {
    VerifyToken = (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new appError_1.AppError(401, "Token is required");
        }
        const token = authorization.replace("Bearer ", "");
        try {
            const { secret } = (0, configs_1.jwtConfig)();
            const decoded = (0, jsonwebtoken_1.verify)(token, secret);
            res.locals.decode = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                throw new appError_1.AppError(401, "Token is invalid");
            }
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new appError_1.AppError(401, "Token expired");
            }
            else {
                throw new appError_1.AppError(500, "Token verification error");
            }
        }
    };
    IsTaskOwner = async (req, res, next) => {
        const taskId = req.params.id;
        const userId = res.locals.decode?.id;
        try {
            const task = await prisma_1.prisma.task.findFirst({ where: { id: Number(taskId) } });
            if (!task) {
                throw new appError_1.AppError(404, "Task not found");
            }
            if (task?.userId !== userId) {
                throw new appError_1.AppError(403, "This user is not the task owner");
            }
            next();
        }
        catch (error) {
            console.error('Error:', error);
            if (error instanceof appError_1.AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            throw new appError_1.AppError(500, "Internal Server Error");
        }
    };
    IsCategoryOwner = async (req, res, next) => {
        const categoryId = req.params.id;
        const userId = res.locals.decode?.id;
        try {
            const category = await prisma_1.prisma.category.findFirst({ where: { id: Number(categoryId) }, });
            if (!category) {
                throw new appError_1.AppError(404, "category not found");
            }
            if (category?.userId !== userId) {
                throw new appError_1.AppError(403, "This user is not the category owner");
            }
            next();
        }
        catch (error) {
            console.error('Error:', error);
            if (error instanceof appError_1.AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            throw new appError_1.AppError(500, "Internal Server Error");
        }
    };
}
exports.userAuth = new userAuthentication();
