"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
});
exports.CategorySchema = exports.categorySchema.omit({ id: true });
