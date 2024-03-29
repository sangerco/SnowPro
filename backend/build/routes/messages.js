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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonschema = __importStar(require("jsonschema"));
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var expressError_1 = require("../expressError");
var message_1 = __importDefault(require("../models/message"));
var messageReply_1 = __importDefault(require("../models/messageReply"));
var messageNew_json_1 = __importDefault(require("../schemas/messageNew.json"));
var router = express_1.default.Router();
// create a new message
router.post("/api/new-message", auth_1.ensureLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errors, _a, senderId, recipientId, subject, body, message, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                validator = jsonschema.validate(req.body, messageNew_json_1.default);
                if (!validator.valid) {
                    errors = validator.errors.map(function (e) { return e.stack; });
                    throw new expressError_1.BadRequestError(errors);
                }
                _a = req.body, senderId = _a.senderId, recipientId = _a.recipientId, subject = _a.subject, body = _a.body;
                return [4 /*yield*/, message_1.default.createMessage(senderId, recipientId, subject, body)];
            case 1:
                message = _b.sent();
                return [2 /*return*/, res.status(201).json({ message: message })];
            case 2:
                e_1 = _b.sent();
                return [2 /*return*/, next(e_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get message
router.get("/messages/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var message, replies, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, message_1.default.getMessage(req.params.id)];
            case 1:
                message = _a.sent();
                return [4 /*yield*/, messageReply_1.default.getRepliesByMessageId(req.params.id)];
            case 2:
                replies = _a.sent();
                return [2 /*return*/, res.json(__assign(__assign({}, message), { replies: replies }))];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, next(e_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
// get all of the user's received messages
router.get("/messages/:username", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_1.default.getUsersMessages(req.params.username)];
            case 1:
                messages = _a.sent();
                return [2 /*return*/, res.json({ messages: messages })];
            case 2:
                e_3 = _a.sent();
                return [2 /*return*/, next(e_3)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get all of the user's sent messages
router.get("/messages/:username/sent", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_1.default.getSentMessages(req.params.username)];
            case 1:
                messages = _a.sent();
                return [2 /*return*/, res.json({ messages: messages })];
            case 2:
                e_4 = _a.sent();
                return [2 /*return*/, next(e_4)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// mark a message as read
router.patch("/api/messages/:id/read", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_1.default.markMessageAsRead(req.params.id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ markedAsRead: req.params.id })];
            case 2:
                e_5 = _a.sent();
                next(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// mark a message as unread
router.patch("/api/messages/:id/unread", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_1.default.markMessageAsUnread(req.params.id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ markedAsUnread: req.params.id })];
            case 2:
                e_6 = _a.sent();
                next(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete a message
router.delete("/api/messages/:id", auth_1.ensureLoggedIn, auth_1.checkIfUserOrAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, message_1.default.removeMessage(req.params.id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ deleted: req.params.id })];
            case 2:
                e_7 = _a.sent();
                return [2 /*return*/, next(e_7)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
