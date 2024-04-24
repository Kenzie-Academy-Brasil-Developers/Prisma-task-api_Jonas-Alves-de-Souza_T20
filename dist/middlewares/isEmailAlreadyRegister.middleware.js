"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailAlreadyRegister = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../erros/appError");
class isEmailAlreadyRegister {
    static async execute(req, res, next) {
        if (!req.body.email || typeof req.body.email !== "string") {
            throw new appError_1.AppError(400, "Invalid email provided");
        }
        const user = await prisma_1.prisma.user.findFirst({ where: { email: req.body.email } });
        if (user) {
            throw new appError_1.AppError(409, "This email is already registered");
        }
        next();
    }
}
exports.isEmailAlreadyRegister = isEmailAlreadyRegister;
