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
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.createMessage = function (senderId, recipientId, subject, body) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createdAt, result, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        createdAt = new Date();
                        return [4 /*yield*/, db_1.default.query("\n            INSERT INTO messages\n            (   id,\n                sender_id,\n                recipient_id,\n                subject,\n                body, \n                created_at)\n            VALUES ($1, $2, $3, $4, $5, $6)\n            RETURNING\n                id,\n                sender_id AS \"senderId\",\n                recipient_id AS \"recipientId\",\n                subject,\n                body\n                created_at AS \"createdAt\"", [id,
                                senderId,
                                recipientId,
                                subject,
                                body,
                                createdAt
                            ])];
                    case 1:
                        result = _a.sent();
                        message = result.rows[0];
                        return [2 /*return*/, message];
                }
            });
        });
    };
    ;
    Message.getMessage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT \n                m.id,\n                m.sender_id AS \"senderId\",\n                m.recipient_id AS \"recipientId\",\n                m.subject,\n                m.body,\n                m.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",\n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"              \n            FROM messages m\n            JOIN users sender ON m.sender_id = sender.id\n            JOIN users recipient ON m.recipient_id = recipient.id\n            WHERE m.id = $1\n            ORDER BY created_at", [id])];
                    case 1:
                        result = _a.sent();
                        message = result.rows[0];
                        return [2 /*return*/, message];
                }
            });
        });
    };
    Message.getUsersMessages = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT \n                m.id,\n                m.sender_id AS \"senderId\",\n                m.recipient_id AS \"recipientId\",\n                m.subject,\n                m.body,\n                m.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",\n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"              \n            FROM messages m\n            JOIN users sender ON m.sender_id = sender.id\n            JOIN users recipient ON m.recipient_id = recipient.id\n            WHERE recipient.username = $1\n            ORDER BY m.created_at", [username])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    Message.getSentMessages = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT \n                m.id,\n                m.sender_id AS \"senderId\",\n                m.recipient_id AS \"recipientId\",\n                m.subject,\n                m.body,\n                m.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",\n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"              \n            FROM messages m\n            JOIN users sender ON m.sender_id = sender.id\n            JOIN users recipient ON m.recipient_id = recipient.id\n            WHERE sender.username = $1\n            ORDER BY m.created_at", [username])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    Message.removeMessage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("DELETE FROM messages\n                WHERE id = $1\n                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        message = result.rows[0];
                        if (!message)
                            throw new expressError_1.NotFoundError('Message does not exist!');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Message;
}());
exports.default = Message;
