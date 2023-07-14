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
var Tag = /** @class */ (function () {
    function Tag() {
    }
    Tag.createTag = function (tag) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, newTag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = uuid_1.v4;
                        return [4 /*yield*/, db_1.default.query("\n                INSERT INTO tags (id, tag),\n                    VALUES ($1, $2)\n                    RETURNING id, tag", [id, tag])];
                    case 1:
                        result = _a.sent();
                        newTag = result.rows[0];
                        return [2 /*return*/, newTag];
                }
            });
        });
    };
    ;
    // method to get all reviews, photos, and videos associated with that tag
    Tag.getAssociatedItems = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, rows, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT t.id AS \"tagId\",\n                    t.tag,\n                    r.id AS \"reviewIds\",\n                    p.id AS \"photoIds\",\n                    p.link AS \"photoLinks\",\n                    v.id AS \"videoIds\",\n                    v.link AS \"videoLinks\"\n                FROM tags\n                LEFT JOIN reviews_tags rt ON t.id = rt.tag_id\n                LEFT JOIN reviews r ON rt.review_id = r.id\n                LEFT JOIN photos_tags pt ON t.id = pt.tag_id\n                LEFT JOIN photos p ON pt.photo_id = p.id\n                LEFT JOIN video_tags vt ON t.id =  vt.tag_id\n                LEFT JOIN videos v ON vt.tag_id = v.id\n                WHERE id = $1", [id])];
                    case 1:
                        result = _a.sent();
                        rows = result.rows;
                        if (rows.length === 0)
                            throw new expressError_1.NotFoundError('Tag Not Found');
                        tag = {
                            tagId: rows[0].tagId,
                            tag: rows[0].tag,
                            reviewIds: rows.map(function (row) { return row.reviewIds; }).filter(function (id) { return id !== null; }),
                            photoIds: rows.map(function (row) { return row.photoIds; }).filter(function (id) { return id !== null; }),
                            photoLinks: rows.map(function (row) { return row.photoLinks; }).filter(function (link) { return link !== null; }),
                            videoIds: rows.map(function (row) { return row.videoIds; }).filter(function (id) { return id !== null; }),
                            videoLinks: rows.map(function (row) { return row.videoLinks; }).filter(function (link) { return link !== null; })
                        };
                        return [2 /*return*/, tag];
                }
            });
        });
    };
    Tag.deleteTag = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n                DELETE FROM tags\n                WHERE id = $1\n                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        tag = result.rows[0];
                        if (!tag)
                            throw new expressError_1.NotFoundError('Tag not found.');
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return Tag;
}());
;
exports.default = Tag;
