"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksControllers = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../services");
let TasksControllers = class TasksControllers {
    taskServices;
    constructor(taskServices) {
        this.taskServices = taskServices;
    }
    async create(req, res) {
        const userId = res.locals.decode.id;
        const UserSub = res.locals.decode.sub;
        console.log("userID: " + userId, "userSub: " + UserSub);
        const response = await this.taskServices.create(req.body, Number(userId));
        const response2 = await this.taskServices.create(req.body, Number(UserSub));
        return res.status(201).json(response2);
    }
    async findMany({ query }, res) {
        const userId = res.locals.decode.id;
        const userSub = res.locals.decode.sub;
        const queryParams = query.category ? String(query.category) : undefined;
        const response = await this.taskServices.findMany(Number(userSub), queryParams);
        return res.status(200).json(response);
    }
    async findOne(req, res) {
        const response = await this.taskServices.findOne(Number(req.params.id));
        return res.status(200).json(response);
    }
    async update(req, res) {
        const response = await this.taskServices.update(Number(req.params.id), req.body);
        return res.status(200).json(response);
    }
    async delete(req, res) {
        await this.taskServices.delete(Number(req.params.id));
        return res.status(204).json();
    }
};
exports.TasksControllers = TasksControllers;
exports.TasksControllers = TasksControllers = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.TasksServices)),
    __metadata("design:paramtypes", [services_1.TasksServices])
], TasksControllers);
