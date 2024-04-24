"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTaskCategoryIdValid = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../erros/appError");
class IsTaskCategoryIdValid {
    static async execute(req, res, next) {
        const { categoryId } = req.body;
        if (!categoryId) {
            return next();
        }
        const category = await prisma_1.prisma.category.findFirst({
            where: { id: categoryId }
        });
        if (!category) {
            throw new appError_1.AppError(404, "Category not found");
        }
        return next();
    }
}
exports.IsTaskCategoryIdValid = IsTaskCategoryIdValid;
