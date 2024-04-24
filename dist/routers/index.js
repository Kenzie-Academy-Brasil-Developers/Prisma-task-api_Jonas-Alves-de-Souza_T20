"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = exports.CategoryRouter = exports.TaskRouter = void 0;
var Tasks_router_1 = require("./Tasks.router");
Object.defineProperty(exports, "TaskRouter", { enumerable: true, get: function () { return Tasks_router_1.TaskRouter; } });
var Categories_router_1 = require("./Categories.router");
Object.defineProperty(exports, "CategoryRouter", { enumerable: true, get: function () { return Categories_router_1.CategoryRouter; } });
var use_router_1 = require("./use.router");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return use_router_1.UserRouter; } });
