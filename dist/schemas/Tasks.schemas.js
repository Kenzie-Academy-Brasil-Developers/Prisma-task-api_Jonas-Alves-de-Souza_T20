"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategorySchema = exports.TaskSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const Categories_schemas_1 = require("./Categories.schemas");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().positive().nullish()
});
exports.TaskSchema = exports.taskSchema.omit({
    id: true,
});
exports.TaskCategorySchema = exports.taskSchema.omit({
    categoryId: true
}).extend({
    category: Categories_schemas_1.categorySchema.nullish()
});
