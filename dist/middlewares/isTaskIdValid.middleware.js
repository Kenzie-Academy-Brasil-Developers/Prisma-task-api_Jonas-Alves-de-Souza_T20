"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTaskIdValid = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../erros/appError");
class IsTaskIdValid {
    static async execute(req, res, next) {
        const id = req.params.id;
        const task = await prisma_1.prisma.task.findFirst({
            where: { id: Number(id) },
            include: { category: true }
        });
        if (!task) {
            throw new appError_1.AppError(404, "Task not found");
        }
        res.locals = { ...res.locals, task };
        return next();
    }
}
exports.IsTaskIdValid = IsTaskIdValid;
