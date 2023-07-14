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
var sql_1 = require("../helpers/sql");
var expressError_1 = require("../expressError");
var uuid_1 = require("uuid");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    Photo.createPhoto = function (userId, link, about, tagIds) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, photo, _i, tagIds_1, tagId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        return [4 /*yield*/, db_1.default.query("\n            INSERT INTO photos\n                (   id,\n                    user_id,\n                    link,\n                    about)\n            VALUES ($1, $2, $3, $4)\n            RETURNING \n                    id,\n                    user_id AS \"userId\",\n                    link,\n                    about", [id, userId, link, about])];
                    case 1:
                        result = _a.sent();
                        photo = result.rows[0];
                        _i = 0, tagIds_1 = tagIds;
                        _a.label = 2;
                    case 2:
                        if (!(_i < tagIds_1.length)) return [3 /*break*/, 5];
                        tagId = tagIds_1[_i];
                        return [4 /*yield*/, db_1.default.query("\n                INSERT INTO review_tags (review_id, tag_id)\n                VALUES ($1, $2)", [photo.id, tagId])];
                    case 3:
                        _a.sent();
                        photo.tagIds.push(tagId);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, photo];
                }
            });
        });
    };
    ;
    Photo.getPhoto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, photo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT p.id,\n                p.user_id AS \"userId\",\n                p.link,\n                p.about,\n                p.tag_id AS \"tagId\",\n                t.tag\n                FROM photos p\n                LEFT JOIN photos_tags pt ON p.tag_id = pt.tag_id\n                LEFT JOIN tags t ON pt.tag_id = t.id\n                WHERE p.id = $1", [id])];
                    case 1:
                        result = _a.sent();
                        photo = result.rows[0];
                        if (!photo)
                            throw new expressError_1.NotFoundError('Photo Not Found');
                        return [2 /*return*/, photo];
                }
            });
        });
    };
    ;
    Photo.updatePhoto = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, setCols, values, sqlQuery, result, photo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, sql_1.sqlForPartialUpdate)(data, {
                            userId: "user_id"
                        }), setCols = _a.setCols, values = _a.values;
                        sqlQuery = "UPDATE photos\n                            SET ".concat(setCols, "\n                            WHERE id = ").concat(id, "\n                            RETURNING id,\n                                user_id AS \"userId\",\n                                link,\n                                about");
                        return [4 /*yield*/, db_1.default.query(sqlQuery, __spreadArray(__spreadArray([], values, true), [id], false))];
                    case 1:
                        result = _b.sent();
                        photo = result.rows[0];
                        if (!photo)
                            throw new expressError_1.NotFoundError('Photo not found!');
                        return [2 /*return*/, photo];
                }
            });
        });
    };
    Photo.removePhoto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, photo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            DELETE FROM photos\n                WHERE id = $1\n                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        photo = result.rows[0];
                        if (!photo)
                            throw new expressError_1.NotFoundError('Photo not found!');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Photo;
}());
;
exports.default = Photo;
