"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksServices = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let TasksServices = class TasksServices {
    async create(body, userId) {
        const data = await prisma_1.prisma.task.create({
            data: {
                ...body,
                userId
            }
        });
        return data;
    }
    async findMany(userId, categoryName) {
        if (categoryName) {
            const data = await prisma_1.prisma.task.findMany({
                where: {
                    userId: { equals: userId },
                    category: { name: { equals: categoryName, mode: "insensitive" } }
                },
                orderBy: { id: "asc" },
                include: { category: true }
            });
            return data;
        }
        const data = await prisma_1.prisma.task.findMany({
            where: { userId: { equals: userId } },
            orderBy: { id: "asc" },
            include: { category: true }
        });
        return data;
    }
    async findOne(id) {
        const data = await prisma_1.prisma.task.findFirst({
            where: { id },
            include: { category: true }
        });
        return data;
    }
    async update(id, body) {
        const data = await prisma_1.prisma.task.update({
            where: { id },
            data: body
        });
        return data;
    }
    async delete(id) {
        await prisma_1.prisma.task.delete({ where: { id } });
    }
};
exports.TasksServices = TasksServices;
exports.TasksServices = TasksServices = __decorate([
    (0, tsyringe_1.injectable)()
], TasksServices);
