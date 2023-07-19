"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseURI = exports.BCRYPT_WORK_FACTOR = exports.PORT = exports.SECRET_KEY = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SECRET_KEY = process.env.SECRET_KEY || 'this-is-my-secret-key';
exports.SECRET_KEY = SECRET_KEY;
var PORT = +(process.env.PORT || 5000);
exports.PORT = PORT;
function getDatabaseURI() {
    return process.env.NODE_ENV === 'test' ? 'postgresql:///snowpro_test' : process.env.DATABASE_URL || 'postgresql:///snowpro';
}
exports.getDatabaseURI = getDatabaseURI;
var BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;
console.log('SnowPro Config');
console.log("SECRET KEY: ".concat(SECRET_KEY));
console.log("PORT: ".concat(PORT.toString()));
console.log("BCRYPT_WORK_FACTOR: ".concat(BCRYPT_WORK_FACTOR));
console.log("DATABASE: ".concat(getDatabaseURI()));
console.log("-----------------------");
