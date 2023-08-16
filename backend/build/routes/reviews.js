"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsonschema_1 = require("jsonschema");
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var expressError_1 = require("../expressError");
var review_1 = __importDefault(require("../models/review"));
var reviewUpdate_json_1 = __importDefault(require("../schemas/reviewUpdate.json"));
var reviewReplyNew_json_1 = __importDefault(require("../schemas/reviewReplyNew.json"));
var reviewReplyUpdate_json_1 = __importDefault(require("../schemas/reviewReplyUpdate.json"));
var reviewReply_1 = __importDefault(require("../models/reviewReply"));
var skiArea_1 = __importDefault(require("../models/skiArea"));
var router = express_1.default.Router();
// update a ski area review
router.patch("/api/reviews/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errors, review, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validator = (0, jsonschema_1.validate)(req.body, reviewUpdate_json_1.default);
                if (!validator.valid) {
                    errors = validator.errors.map(function (e) { return e.stack; });
                    throw new expressError_1.BadRequestError(errors);
                }
                return [4 /*yield*/, review_1.default.updateReview(req.params.id, req.body)];
            case 1:
                review = _a.sent();
                return [2 /*return*/, res.json({ review: review })];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, next(e_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/ski-areas/reviews", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, review_1.default.getAllReviews()];
            case 1:
                reviews = _a.sent();
                return [2 /*return*/, res.json({ reviews: reviews })];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get reviews by ski area name
router.get("/ski-areas/:slug/reviews", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, skiArea_1.default.fetchReviewsBySkiAreaSlug(req.params.slug)];
            case 1:
                reviews = _a.sent();
                return [2 /*return*/, res.json({ reviews: reviews })];
            case 2:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get review by id
router.get("/ski-areas/:slug/reviews/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewData, getReviewReplyData, review, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, review_1.default.fetchReviewById(req.params.id)];
            case 1:
                reviewData = _a.sent();
                return [4 /*yield*/, reviewReply_1.default.fetchRepliesByReviewId(req.params.id)];
            case 2:
                getReviewReplyData = _a.sent();
                review = __assign(__assign({}, reviewData), { replyData: getReviewReplyData });
                return [2 /*return*/, res.json({ review: review })];
            case 3:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// delete a ski area review
router.delete("/api/:slug/reviews/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, review_1.default.removeReview(req.params.id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ deleted: "review ".concat(req.params.id) })];
            case 2:
                e_5 = _a.sent();
                return [2 /*return*/, next(e_5)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create a review reply
router.post("/api/reviews/:id/reply", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errors, _a, userId, reviewId, body, slug, reply, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                validator = (0, jsonschema_1.validate)(req.body, reviewReplyNew_json_1.default);
                if (!validator.valid) {
                    errors = validator.errors.map(function (e) { return e.stack; });
                    throw new expressError_1.BadRequestError(errors);
                }
                _a = req.body, userId = _a.userId, reviewId = _a.reviewId, body = _a.body, slug = _a.slug;
                return [4 /*yield*/, reviewReply_1.default.replyToReview(userId, reviewId, body, slug)];
            case 1:
                reply = _b.sent();
                return [2 /*return*/, res.status(201).json({ reply: reply })];
            case 2:
                e_6 = _b.sent();
                return [2 /*return*/, next(e_6)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// update a review reply
router.patch("/api/reviews/reply/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errors, reply, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validator = (0, jsonschema_1.validate)(req.body, reviewReplyUpdate_json_1.default);
                if (!validator.valid) {
                    errors = validator.errors.map(function (e) { return e.stack; });
                    throw new expressError_1.BadRequestError(errors);
                }
                return [4 /*yield*/, reviewReply_1.default.replyToReviewUpdate(req.params.id, req.body)];
            case 1:
                reply = _a.sent();
                return [2 /*return*/, res.json({ reply: reply })];
            case 2:
                e_7 = _a.sent();
                return [2 /*return*/, next(e_7)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// fetch a review reply by id
router.get("/ski-areas/:slug/reviews/:review_id/replies/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reply, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, reviewReply_1.default.fetchReplyId(req.params.id)];
            case 1:
                reply = _a.sent();
                return [2 /*return*/, res.json({ reply: reply })];
            case 2:
                e_8 = _a.sent();
                return [2 /*return*/, next(e_8)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// fetch review replies by review id
router.get("/ski-areas/:slug/reviews/:id/replies", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewReplyData, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, reviewReply_1.default.fetchRepliesByReviewId(req.params.id)];
            case 1:
                reviewReplyData = _a.sent();
                return [2 /*return*/, res.json({ reviewReplyData: reviewReplyData })];
            case 2:
                e_9 = _a.sent();
                next(e_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete a review reply
router.delete("/api/reviews/reply/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, reviewReply_1.default.removeReply(req.params.id)];
            case 1:
                _a.sent();
                res.json({ deleted: "reply: ".concat(req.params.id) });
                return [3 /*break*/, 3];
            case 2:
                e_10 = _a.sent();
                return [2 /*return*/, next(e_10)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
