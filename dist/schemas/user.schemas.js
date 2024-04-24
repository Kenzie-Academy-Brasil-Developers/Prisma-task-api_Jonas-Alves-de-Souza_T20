"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReturnSchema = exports.LoginUserSchema = exports.PromiseUserSchema = exports.UserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const Tasks_schemas_1 = require("./Tasks.schemas");
const Categories_schemas_1 = require("./Categories.schemas");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().min(1),
    password: zod_1.z.string().min(1),
    task: zod_1.z.array(Tasks_schemas_1.taskSchema).nullish(),
    category: zod_1.z.array(Categories_schemas_1.categorySchema).nullish()
});
exports.UserSchema = exports.userSchema.omit({
    id: true,
    task: true,
    category: true,
});
exports.PromiseUserSchema = exports.userSchema.omit({
    task: true,
    category: true
});
exports.LoginUserSchema = exports.userSchema.pick({
    email: true,
    password: true
});
exports.UserReturnSchema = exports.userSchema.omit({
    password: true
});
