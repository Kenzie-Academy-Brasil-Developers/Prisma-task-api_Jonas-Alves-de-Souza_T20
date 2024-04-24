"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let CategoryServices = class CategoryServices {
    async create(body, userId) {
        const data = await prisma_1.prisma.category.create({
            data: {
                ...body,
                userId
            }
        });
        return data;
    }
    async delete(id) {
        await prisma_1.prisma.category.delete({ where: { id } });
    }
};
exports.CategoryServices = CategoryServices;
exports.CategoryServices = CategoryServices = __decorate([
    (0, tsyringe_1.injectable)()
], CategoryServices);
