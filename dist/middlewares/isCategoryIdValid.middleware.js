"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCategoryIdValid = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../erros/appError");
class IsCategoryIdValid {
    static async execute(req, res, next) {
        const id = req.params.id;
        const category = await prisma_1.prisma.category.findFirst({
            where: { id: Number(id) },
        });
        if (!category) {
            throw new appError_1.AppError(404, "Category not found");
        }
        res.locals = { ...res.locals, category };
        return next();
    }
}
exports.IsCategoryIdValid = IsCategoryIdValid;
