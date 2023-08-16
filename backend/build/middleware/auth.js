"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserOrAdmin = exports.checkIfAdmin = exports.ensureLoggedIn = exports.authenticateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var expressError_1 = require("../expressError");
var authenticateJWT = function (req, res, next) {
    try {
        var authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            var token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        }
        return next();
    }
    catch (e) {
        return next();
    }
};
exports.authenticateJWT = authenticateJWT;
var ensureLoggedIn = function (req, res, next) {
    try {
        if (!res.locals.user)
            throw new expressError_1.UnauthorizedError("Unauthorized");
        return next();
    }
    catch (e) {
        return next();
    }
};
exports.ensureLoggedIn = ensureLoggedIn;
var checkIfAdmin = function (req, res, next) {
    try {
        if (res.locals.user.isAdmin === false)
            throw new expressError_1.UnauthorizedError("Unauthorized");
        return next();
    }
    catch (e) {
        return next();
    }
};
exports.checkIfAdmin = checkIfAdmin;
var checkIfUserOrAdmin = function (req, res, next) {
    try {
        var user = res.locals.user;
        if (user.username !== req.params.username && user.isAdmin === false)
            throw new expressError_1.UnauthorizedError("Unauthorized");
        return next();
    }
    catch (e) {
        return next();
    }
};
exports.checkIfUserOrAdmin = checkIfUserOrAdmin;
