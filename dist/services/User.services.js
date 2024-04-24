"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
const appError_1 = require("../erros/appError");
const schemas_1 = require("../schemas");
const configs_1 = require("../configs");
let UserServices = class UserServices {
    async userRegister(body) {
        if (!body.password) {
            throw new appError_1.AppError(400, "Password is required");
        }
        const hashedPassword = await (0, bcrypt_1.hash)(body.password, 10);
        const newUser = await prisma_1.prisma.user.create({
            data: {
                ...body,
                password: hashedPassword,
            },
        });
        return schemas_1.UserReturnSchema.parse(newUser);
    }
    async login({ email, password }) {
        const user = await prisma_1.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new appError_1.AppError(404, "User not exists");
        }
        const comparePassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!comparePassword) {
            throw new appError_1.AppError(401, "Email and password doens't match");
        }
        const { secret, expiresIn } = (0, configs_1.jwtConfig)();
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, secret, {
            subject: user.id.toString(),
            expiresIn
        });
        return {
            accessToken: token,
            user: schemas_1.UserReturnSchema.parse(user)
        };
    }
    async getUser(id) {
        const user = await prisma_1.prisma.user.findFirst({ where: { id } });
        if (!user) {
            throw new appError_1.AppError(404, "User not found");
        }
        return schemas_1.UserReturnSchema.parse(user);
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);
