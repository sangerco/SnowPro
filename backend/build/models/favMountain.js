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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var expressError_1 = require("../expressError");
var uuid_1 = require("uuid");
var FavMountain = /** @class */ (function () {
    function FavMountain() {
    }
    FavMountain.createFavMountain = function (userId, skiAreaSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, favMountain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        return [4 /*yield*/, db_1.default.query("\n            INSERT INTO fav_mountains\n            (   id,\n                user_id,\n                ski_area_slug)\n            VALUES ($1, $2, $3)\n            RETURNING id, user_id AS \"userId, ski_area_slug AS \"skiAreaSlug", [id, userId, skiAreaSlug])];
                    case 1:
                        result = _a.sent();
                        favMountain = result.rows[0];
                        return [2 /*return*/, favMountain];
                }
            });
        });
    };
    FavMountain.fetchFavMountainDataByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, favMountains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT u.username,\n                    s.slug AS \"skiAreaSlug\",\n                    s.name AS \"skiAreaName\"\n            FROM users u\n            LEFT JOIN fav_mountains fm ON u.id = fm.user_id\n            LEFT JOIN ski_areas s ON fm.ski_area_slug = s.slug\n            WHERE user_id = $1", [userId])];
                    case 1:
                        result = _a.sent();
                        favMountains = result.rows;
                        return [2 /*return*/, favMountains];
                }
            });
        });
    };
    ;
    FavMountain.fetchFavMountainDataBySkiAreaSlug = function (skiAreaSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var result, favMountains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT s.slug AS \"skiAreaSlug\",\n                    u.user_id AS \"userId\",\n                    u.username,\n            FROM ski_areas s\n            LEFT JOIN fav_mountains fm ON s.slug = fm.ski_area_slug\n            LEFT JOIN users u ON fm.user_id = u.id\n            WHERE slug = $1", [skiAreaSlug])];
                    case 1:
                        result = _a.sent();
                        favMountains = result.rows;
                        return [2 /*return*/, favMountains];
                }
            });
        });
    };
    ;
    FavMountain.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, favMountain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("DELETE FROM fav_mountains\n                WHERE id = $1\n                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        favMountain = result.rows[0];
                        if (!favMountain)
                            throw new expressError_1.NotFoundError('Favorite not found!');
                        return [2 /*return*/];
                }
            });
        });
    };
    return FavMountain;
}());
exports.default = FavMountain;
