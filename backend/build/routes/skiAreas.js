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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var jsonschema = __importStar(require("jsonschema"));
var express_1 = __importDefault(require("express"));
var expressError_1 = require("../expressError");
var skiArea_1 = __importDefault(require("../models/skiArea"));
var review_1 = __importDefault(require("../models/review"));
var reviewNew_json_1 = __importDefault(require("../schemas/reviewNew.json"));
var secret_1 = require("../vault/secret");
var axios_1 = __importDefault(require("axios"));
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.get('/ski-areas', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, currentPage, totalPages, allSkiAreas, url, options, response, data, _i, allSkiAreas_1, skiArea, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = 'https://api.skiapi.com/v1/resort';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                currentPage = 1;
                totalPages = 6;
                allSkiAreas = [];
                _a.label = 2;
            case 2:
                if (!(currentPage <= totalPages)) return [3 /*break*/, 4];
                url = "".concat(baseUrl, "?page=").concat(currentPage);
                options = {
                    method: 'GET',
                    url: url,
                    headers: {
                        'X-RapidAPI-Key': secret_1.Key,
                        'X-RapidAPI-Host': secret_1.Host
                    }
                };
                return [4 /*yield*/, axios_1.default.request(options)];
            case 3:
                response = _a.sent();
                console.log(response);
                data = response.data.data;
                allSkiAreas = __spreadArray(__spreadArray([], allSkiAreas, true), data, true);
                currentPage++;
                return [3 /*break*/, 2];
            case 4:
                _i = 0, allSkiAreas_1 = allSkiAreas;
                _a.label = 5;
            case 5:
                if (!(_i < allSkiAreas_1.length)) return [3 /*break*/, 8];
                skiArea = allSkiAreas_1[_i];
                console.log(skiArea.slug, skiArea.name);
                return [4 /*yield*/, skiArea_1.default.createSkiArea(skiArea.slug, skiArea.name)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8:
                res.json(allSkiAreas);
                return [3 /*break*/, 10];
            case 9:
                e_1 = _a.sent();
                console.error(e_1);
                res.status(500).json({ error: 'An error occurred while fetching data.' });
                return [3 /*break*/, 10];
            case 10:
                ;
                return [2 /*return*/];
        }
    });
}); });
router.get('/ski-areas/:slug', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var url, slug, options, response, skiAreaData, getReviewData, getUsersFavoritedBy, combinedData, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/';
                slug = req.params.slug;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                options = {
                    method: "GET",
                    url: "".concat(url).concat(slug),
                    headers: {
                        'X-RapidAPI-Key': secret_1.Key,
                        'X-RapidAPI-Host': secret_1.Host
                    }
                };
                return [4 /*yield*/, axios_1.default.request(options)];
            case 2:
                response = _a.sent();
                skiAreaData = response.data.data;
                return [4 /*yield*/, skiArea_1.default.fetchReviewsBySkiAreaSlug(slug)];
            case 3:
                getReviewData = _a.sent();
                return [4 /*yield*/, skiArea_1.default.returnUsersFavoritedBy(slug)];
            case 4:
                getUsersFavoritedBy = _a.sent();
                combinedData = __assign(__assign({}, skiAreaData), { reviewData: getReviewData, usersFavoritedBy: getUsersFavoritedBy });
                res.json(combinedData);
                return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.error(e_2);
                res.status(500).json({ error: 'An error occurred while fetching the data.' });
                return [3 /*break*/, 6];
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); });
router.post('/api/ski-areas/:slug/review', auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errors, _a, userId, skiAreaSlug, header, body, stars, photos, tagIds, review, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                validator = jsonschema.validate(req.body, reviewNew_json_1.default);
                if (!validator.valid) {
                    errors = validator.errors.map(function (e) { return e.stack; });
                    throw new expressError_1.BadRequestError(errors);
                }
                _a = req.body, userId = _a.userId, skiAreaSlug = _a.skiAreaSlug, header = _a.header, body = _a.body, stars = _a.stars, photos = _a.photos, tagIds = _a.tagIds;
                return [4 /*yield*/, review_1.default.createReview(userId, skiAreaSlug, header, body, stars, photos, tagIds)];
            case 1:
                review = _b.sent();
                return [2 /*return*/, res.status(201).json({ review: review })];
            case 2:
                e_3 = _b.sent();
                return [2 /*return*/, next(e_3)];
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
