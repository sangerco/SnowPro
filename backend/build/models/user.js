"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var sql_1 = require("../helpers/sql");
var expressError_1 = require("../expressError");
var config_1 = require("../config");
var uuid_1 = require("uuid");
var User = /** @class */ (function () {
    function User() {
    }
    User.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user, isItValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT username,\n                    password,\n                    first_name AS \"firstName\",\n                    last_name AS \"lastName\",\n                    email\n            FROM users\n            WHERE username = $1", [username])];
                    case 1:
                        result = _a.sent();
                        user = result.rows[0];
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isItValid = _a.sent();
                        if (isItValid === true) {
                            delete user.password;
                            return [2 /*return*/, user];
                        }
                        _a.label = 3;
                    case 3: throw new expressError_1.UnauthorizedError('Invalid username/password');
                }
            });
        });
    };
    ;
    User.register = function (username, password, firstName, lastName, email) {
        return __awaiter(this, void 0, void 0, function () {
            var dupeCheck, hashedPassword, id, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT username\n                FROM users\n                WHERE username = $1", [username])];
                    case 1:
                        dupeCheck = _a.sent();
                        if (dupeCheck.rows[0]) {
                            throw new expressError_1.BadRequestError("Duplicate username: ".concat(username));
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, config_1.BCRYPT_WORK_FACTOR)];
                    case 2:
                        hashedPassword = _a.sent();
                        id = (0, uuid_1.v4)();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO users\n                (   id,\n                    username,\n                    password,\n                    first_name,\n                    last_name,\n                    email)\n                    VALUES ($1, $2, $3, $4, $5, $6)\n                    RETURNING username, first_name AS \"firstName\", last_name AS \"lastName\", email", [id,
                                username,
                                hashedPassword,
                                firstName,
                                lastName,
                                email
                            ])];
                    case 3:
                        result = _a.sent();
                        user = result.rows[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    User.findAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT id,\n                    username,\n                    first_name AS \"firstName\",\n                    last_name AS \"lastName\",\n                    email,\n                    avatar,\n                    bio\n                FROM users\n                ORDER BY username")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    User.getUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, rows, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT u.id,\n                    u.username,\n                    u.first_name AS \"firstName\",\n                    u.last_name AS \"lastName\",\n                    u.email,\n                    u.avatar,\n                    u.bio,\n                    u.is_admin AS \"isAdmin\",\n                    v.link AS \"videos\",\n                    p.link AS \"photos\",\n                    s.name AS \"favMountains\" \n                FROM users u\n                LEFT JOIN users_videos uv ON u.id = uv.user_id\n                LEFT JOIN videos v ON uv.video_id = v.id\n                LEFT JOIN users_photos up ON u.id = up.user_id\n                LEFT JOIN photos p ON up.photo_id = p.id\n                LEFT JOIN fav_mountains fm ON u.id = fm.user_id\n                LEFT JOIN ski_areas s ON fm.ski_areas_slug = s.slug\n                WHERE username = $1", [username])];
                    case 1:
                        result = _a.sent();
                        rows = result.rows;
                        if (rows.length === 0)
                            throw new expressError_1.NotFoundError('User not found.');
                        user = {
                            id: rows[0].id,
                            username: rows[0].username,
                            firstName: rows[0].firstName,
                            lastName: rows[0].lastName,
                            email: rows[0].email,
                            avatar: rows[0].avatar,
                            bio: rows[0].bio,
                            videos: rows.map(function (row) { return row.videos; }).filter(function (link) { return link !== null; }),
                            photos: rows.map(function (row) { return row.photos; }).filter(function (link) { return link !== null; }),
                            favMountains: rows.map(function (row) { return row.favMountains; }).filter(function (slug) { return slug !== null; }),
                            isAdmin: rows[0].isAdmin
                        };
                        return [2 /*return*/, user];
                }
            });
        });
    };
    User.updateUser = function (username, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, setCols, values, usernameVarIdx, sqlQuery, result, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!data.password) return [3 /*break*/, 2];
                        _a = data;
                        return [4 /*yield*/, bcrypt_1.default.hash(data.password, config_1.BCRYPT_WORK_FACTOR)];
                    case 1:
                        _a.password = _c.sent();
                        _c.label = 2;
                    case 2:
                        _b = (0, sql_1.sqlForPartialUpdate)(data, {
                            firstName: 'first_name',
                            lastName: 'last_name'
                        }), setCols = _b.setCols, values = _b.values;
                        usernameVarIdx = "$" + (values.length + 1);
                        sqlQuery = "UPDATE users\n                                SET ".concat(setCols, "\n                                WHERE username = ").concat(usernameVarIdx, "\n                                RETURNING username,\n                                    first_name AS \"firstName\",\n                                    last_name AS \"lastName\",\n                                    email,\n                                    avatar,\n                                    bio");
                        return [4 /*yield*/, db_1.default.query(sqlQuery, __spreadArray(__spreadArray([], values, true), [username], false))];
                    case 3:
                        result = _c.sent();
                        user = result.rows[0];
                        if (!user)
                            throw new expressError_1.NotFoundError("User not found: ".concat(username));
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    User.remove = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("DELETE FROM users\n                    WHERE username = $1\n                    RETURNING username", [username])];
                    case 1:
                        result = _a.sent();
                        user = result.rows[0];
                        if (!user)
                            throw new expressError_1.NotFoundError("User not found: ".concat(username));
                        return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = User;
