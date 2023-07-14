"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
/** Return signed JWT from user data. */
function createToken(user) {
    console.assert(user.isAdmin !== undefined, "createToken passed user without isAdmin property");
    var payload = {
        username: user.username,
        isAdmin: user.isAdmin || false,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.SECRET_KEY);
}
exports.createToken = createToken;
