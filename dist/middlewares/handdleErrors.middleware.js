"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const appError_1 = require("../erros/appError");
class HandleErrors {
    static execute(error, req, res, next) {
        if (error instanceof appError_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(403).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.HandleErrors = HandleErrors;
