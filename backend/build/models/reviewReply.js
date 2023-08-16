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
var ReviewReply = /** @class */ (function () {
    function ReviewReply() {
    }
    ReviewReply.replyToReview = function (userId, reviewId, body, slug) {
        return __awaiter(this, void 0, void 0, function () {
            var reviewCheck, review, id, createdAt, result, username, reviewReplyData, reviewReply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT id\n            FROM reviews\n            WHERE id = $1", [reviewId])];
                    case 1:
                        reviewCheck = _a.sent();
                        review = reviewCheck.rows[0];
                        if (!review)
                            throw new expressError_1.NotFoundError("Review does not exist!");
                        id = (0, uuid_1.v4)();
                        createdAt = new Date();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO review_replies\n                (id,\n                    user_id,\n                    review_id,\n                    ski_area_slug,\n                    body,\n                    created_at)\n            VALUES ($1, $2, $3, $4, $5, $6)\n            RETURNING \n                id,\n                user_id AS \"userId\",\n                review_id AS \"reviewId\",\n                ski_area_slug AS \"slug\",\n                body,\n                created_at AS \"createdAt\"", [id, userId, reviewId, slug, body, createdAt])];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, db_1.default.query("\n            SELECT username FROM users WHERE id = $1", [userId])];
                    case 3:
                        username = _a.sent();
                        reviewReplyData = result.rows[0];
                        reviewReplyData.username = username;
                        reviewReply = {
                            id: reviewReplyData.id,
                            userId: reviewReplyData.userId,
                            username: reviewReplyData.username,
                            reviewId: reviewReplyData.reviewId,
                            slug: reviewReplyData.slug,
                            body: reviewReplyData.body,
                            createdAt: reviewReplyData.createdAt,
                        };
                        return [2 /*return*/, reviewReply];
                }
            });
        });
    };
    ReviewReply.replyToReviewUpdate = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, setCols, values, sqlQuery, result, reviewReply;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, sql_1.sqlForPartialUpdate)(data, {}), setCols = _a.setCols, values = _a.values;
                        sqlQuery = "UPDATE review_replies\n                            SET ".concat(setCols, "\n                            WHERE id = ").concat(id, "\n                            RETURNING user_id AS \"userId\",\n                                        review_id AS \"reviewId\",\n                                        ski_area_slug AS \"slug\",\n                                        body,\n                                        created_at AS \"createdAt\"");
                        return [4 /*yield*/, db_1.default.query(sqlQuery, __spreadArray(__spreadArray([], values, true), [id], false))];
                    case 1:
                        result = _b.sent();
                        reviewReply = {
                            id: result.rows[0].id,
                            userId: result.rows[0].userId,
                            username: result.rows[0].username,
                            reviewId: result.rows[0].reviewId,
                            slug: result.rows[0].slug,
                            body: result.rows[0].body,
                            createdAt: result.rows[0].createdAt,
                        };
                        if (!reviewReply)
                            throw new expressError_1.NotFoundError("Review Reply Not Found!");
                        return [2 /*return*/, reviewReply];
                }
            });
        });
    };
    ReviewReply.fetchRepliesByReviewId = function (reviewId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, replies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT r.id,\n                r.review_id AS \"reviewId\",\n                r.user_id AS \"userId\",\n                u.username,\n                r.body,\n                r.ski_area_slug AS \"slug\",\n                r.created_at AS \"createdAt\"\n            FROM review_replies r\n            LEFT JOIN users u ON r.user_id = u.id\n            WHERE review_id = $1", [reviewId])];
                    case 1:
                        result = _a.sent();
                        replies = result.rows;
                        if (replies.length === 0)
                            throw new expressError_1.NotFoundError("No Replies to this Review");
                        return [2 /*return*/, replies];
                }
            });
        });
    };
    ReviewReply.fetchReplyId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT r.id,\n                r.review_id AS \"reviewId\",\n                r.user_id AS \"userId\",\n                u.username,\n                r.body,\n                r.ski_area_slug AS \"slug\",\n                r.created_at AS \"createdAt\"\n            FROM review_replies r\n            LEFT JOIN users u ON r.user_id = u.id\n            WHERE id = $1", [id])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        if (!reply)
                            throw new expressError_1.NotFoundError("Reply Not Found.");
                        return [2 /*return*/, reply];
                }
            });
        });
    };
    ReviewReply.removeReply = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, replyToReview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            DELETE FROM review_replies\n            WHERE id = $1\n            RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        replyToReview = result.rows[0];
                        if (!replyToReview)
                            throw new expressError_1.NotFoundError("Review Reply Not Found!");
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReviewReply;
}());
exports.default = ReviewReply;
