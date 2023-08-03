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
var Review = /** @class */ (function () {
    function Review() {
    }
    Review.createReview = function (userId, skiAreaSlug, header, body, stars, photos, tagIds) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createdAt, result, reviewData, _i, tagIds_1, tagId, _a, photos_1, photo, photoId, photoCreatedAt, photoResult, skiAreaName, review;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        createdAt = new Date();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO reviews\n                (id,\n                   user_id,\n                   ski_area_slug,\n                   header,\n                   body,\n                   stars,\n                   tag_ids,\n                   created_at)\n            VALUES ($1, $2, $3, $4, $5, $6, $7)\n            RETURNING\n                id,\n                user_id AS \"userId\", \n                ski_area_slug AS \"skiAreaSlug\", \n                header,\n                body, \n                stars,\n                tag_ids AS \"tagIds\",\n                created_at AS \"createdAt\"", [id,
                                userId,
                                skiAreaSlug,
                                header,
                                body,
                                stars,
                                tagIds,
                                createdAt
                            ])];
                    case 1:
                        result = _b.sent();
                        reviewData = result.rows[0];
                        _i = 0, tagIds_1 = tagIds;
                        _b.label = 2;
                    case 2:
                        if (!(_i < tagIds_1.length)) return [3 /*break*/, 5];
                        tagId = tagIds_1[_i];
                        return [4 /*yield*/, db_1.default.query("\n                INSERT INTO review_tags (review_id, tag_id)\n                VALUES ($1, $2)", [reviewData.id, tagId])];
                    case 3:
                        _b.sent();
                        reviewData.tagIds.push(tagId);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _a = 0, photos_1 = photos;
                        _b.label = 6;
                    case 6:
                        if (!(_a < photos_1.length)) return [3 /*break*/, 10];
                        photo = photos_1[_a];
                        photoId = (0, uuid_1.v4)();
                        photoCreatedAt = new Date();
                        return [4 /*yield*/, db_1.default.query("\n                INSERT INTO photos (\n                    id,\n                    user_id,\n                    link,\n                    created_at)\n                VALUES ($1, $2, $3, $4)\n                RETURNING\n                    id,\n                    user_id AS \"userId\",\n                    link,\n                    created_at AS \"createdAt\"", [photoId,
                                userId,
                                photo,
                                photoCreatedAt])];
                    case 7:
                        photoResult = _b.sent();
                        return [4 /*yield*/, db_1.default.query("\n                INSERT INTO reviews_photos (review_id, photo_id)\n                VALUES ($1, $2)", [reviewData.id, photoId])];
                    case 8:
                        _b.sent();
                        reviewData.photos.push(photoId);
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 6];
                    case 10: return [4 /*yield*/, db_1.default.query("\n            SELECT name AS \"skiAreaName\" FROM ski_areas WHERE slug = $1", [skiAreaSlug])];
                    case 11:
                        skiAreaName = _b.sent();
                        reviewData.skiAreaName = skiAreaName;
                        review = {
                            id: reviewData.id,
                            userId: reviewData.userId,
                            skiAreaSlug: reviewData.skiAreaSlug,
                            skiAreaName: reviewData.skiAreaName,
                            header: reviewData.header,
                            body: reviewData.body,
                            stars: reviewData.stars,
                            photos: reviewData.photos,
                            tagIds: reviewData.tagIds
                        };
                        return [2 /*return*/, review];
                }
            });
        });
    };
    Review.updateReview = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, setCols, values, sqlQuery, result, review;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, sql_1.sqlForPartialUpdate)(data, {
                            tagIds: 'tag_ids'
                        }), setCols = _a.setCols, values = _a.values;
                        sqlQuery = "UPDATE reviews\n                            SET ".concat(setCols, "\n                            WHERE id = ").concat(id, "\n                            RETURNING user_id AS \"userId\",\n                            ski_area_slug AS \"skiAreaSlug\",\n                            header,\n                            body,\n                            stars,\n                            photos,\n                            created_at AS \"createdAt\"");
                        return [4 /*yield*/, db_1.default.query(sqlQuery, __spreadArray(__spreadArray([], values, true), [id], false))];
                    case 1:
                        result = _b.sent();
                        review = result.rows[0];
                        if (!review)
                            throw new expressError_1.NotFoundError('No such review found.');
                        return [2 /*return*/, review];
                }
            });
        });
    };
    Review.fetchReviewsBySkiArea = function (skiAreaName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reviews;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT r.id,\n                r.user_id AS \"userId\",\n                r.ski_area_slug AS \"skiAreaSlug\",\n                r.header,\n                r.body,\n                r.stars,\n                p.link,\n                u.username,\n                s.name AS \"skiAreaName\",\n                t.tag\n            FROM reviews r\n            LEFT JOIN users u ON r.user_id = u.id\n            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug\n            LEFT JOIN review_tags rt ON r.tag_ids = rt.tag_id\n            LEFT JOIN tags t ON rt.tag_id = t.id\n            LEFT JOIN reviews_photos rp ON r.photo = rp.photo_id\n            LEFT JOIN photos p ON rp.photo_id = p.id\n            WHERE s.name = $1\n            // ORDER BY r.created_at", [skiAreaName])];
                    case 1:
                        result = _a.sent();
                        reviews = result.rows;
                        if (reviews.length === 0) {
                            throw new expressError_1.NotFoundError('No reviews found');
                        }
                        ;
                        return [2 /*return*/, reviews];
                }
            });
        });
    };
    Review.fetchReviewById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT r.id,\n                r.user_id AS \"userId\",\n                r.ski_area_slug AS \"skiAreaSlug\",\n                r.header,\n                r.body,\n                r.stars,\n                p.link AS \"photos\",\n                u.username,\n                s.name AS \"skiAreaName\",\n                t.tag AS \"tags\"\n            FROM reviews r\n            LEFT JOIN users u ON r.user_id = u.id\n            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug\n            LEFT JOIN review_tags rt ON r.tag_ids = rt.tag_id\n            LEFT JOIN tags t ON rt.tag_id = t.id\n            LEFT JOIN reviews_photos rp ON r.photos = rp.photo_id\n            LEFT JOIN photos p ON rp.photo_id = p.id\n            WHERE r.id = $1\n            ORDER BY r.created_at", [id])];
                    case 1:
                        result = _a.sent();
                        review = result.rows[0];
                        if (!review)
                            throw new expressError_1.NotFoundError('Review Not Found');
                        return [2 /*return*/, review];
                }
            });
        });
    };
    Review.removeReview = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n                                DELETE FROM reviews\n                                WHERE id = $1\n                                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        review = result.rows[0];
                        if (!review)
                            throw new expressError_1.NotFoundError('No such review found.');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Review;
}());
exports.default = Review;
