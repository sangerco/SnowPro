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
var Reply = /** @class */ (function () {
    function Reply() {
    }
    Reply.createReply = function (messageId, senderId, recipientId, subject, body) {
        return __awaiter(this, void 0, void 0, function () {
            var id, created_at, result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        created_at = new Date();
                        return [4 /*yield*/, db_1.default.query("\n            INSERT INTO message_replies\n            (   id,\n                message_id,\n                sender_id,\n                recipient_id,\n                subject,\n                body,\n                created_at,\n                is_read)\n            VALUES ($1, $2, $3, $4, $5, $6, false)\n            RETURNING \n                id,\n                message_id AS \"messageId\",\n                sender_id AS \"senderId\",\n                recipient_id AS \"recipientId\",\n                subject,\n                body,\n                is_read AS \"isRead\",\n                created_at AS \"createdAt\"", [id, messageId, senderId, recipientId, subject, body, created_at])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        return [2 /*return*/, reply];
                }
            });
        });
    };
    Reply.getReplyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT \n                r.id,\n                r.message_id AS \"messageId\",\n                r.sender_id AS \"senderId\",\n                r.recipient_id AS \"recipientId\",\n                r.subject,\n                r.body,\n                r.is_read AS \"isRead\",\n                r.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",            \n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"\n            FROM message_replies r\n            JOIN users sender ON r.sender_id = sender.id\n            JOIN users recipient ON r.recipient_id = recipient.id\n            WHERE r.id = $1\n            ORDER BY r.created_at", [id])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        return [2 /*return*/, reply];
                }
            });
        });
    };
    Reply.getRepliesByMessageId = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, replies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT \n                r.id,\n                r.message_id AS \"messageId\",\n                r.sender_id AS \"senderId\",\n                r.recipient_id AS \"recipientId\",\n                r.subject,\n                r.body,\n                r.is_read AS \"isRead\",\n                r.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",            \n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"                \n                FROM message_replies r\n                JOIN users sender ON r.sender_id = sender.id\n                JOIN users recipient ON r.recipient_id = recipient.id\n                WHERE r.message_id = $1\n                ORDER BY r.created_at", [messageId])];
                    case 1:
                        result = _a.sent();
                        replies = result.rows;
                        return [2 /*return*/, replies];
                }
            });
        });
    };
    Reply.getReceivedRepliesByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, replies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT \n                r.id,\n                r.message_id AS \"messageId\",\n                r.sender_id AS \"senderId\",\n                r.recipient_id AS \"recipientId\",\n                r.subject,\n                r.body,\n                r.is_read AS \"isRead\",\n                r.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",\n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"\n            FROM message_replies r\n            JOIN users sender on r.sender_id = sender.id\n            JOIN users recipient on r.recipient_id = recipient.id\n            WHERE recipient.username = $1\n            ORDER BY r.created_at", [username])];
                    case 1:
                        result = _a.sent();
                        replies = result.rows;
                        return [2 /*return*/, replies];
                }
            });
        });
    };
    Reply.getSentRepliesByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, replies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            SELECT \n                r.id,\n                r.message_id AS \"messageId\",\n                r.sender_id AS \"senderId\",\n                r.recipient_id AS \"recipientId\",\n                r.subject,\n                r.body,\n                r.is_read AS \"isRead\",\n                r.created_at AS \"createdAt\",\n                sender.username AS \"senderUsername\",\n                sender.first_name AS \"senderFirstName\",\n                sender.last_name AS \"senderLastName\",\n                recipient.username AS \"recipientUsername\",\n                recipient.first_name AS \"recipientFirstName\",\n                recipient.last_name AS \"recipientLastName\"\n            FROM message_replies r\n            JOIN users sender on r.sender_id = sender.id\n            JOIN users recipient on r.recipient_id = recipient.id\n            WHERE sender.username = $1\n            ORDER BY r.created_at", [username])];
                    case 1:
                        result = _a.sent();
                        replies = result.rows;
                        return [2 /*return*/, replies];
                }
            });
        });
    };
    Reply.markMessageReplyAsRead = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            UPDATE message_replies\n            SET is_read = true\n            WHERE id = $1\n            RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        if (!reply)
                            throw new expressError_1.NotFoundError("Message does not exist!");
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.markMessageReplyAsUnread = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            UPDATE message_replies\n            SET is_read = false\n            WHERE id = $1\n            RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        if (!reply)
                            throw new expressError_1.NotFoundError("Message does not exist!");
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.deleteReply = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("\n            DELETE FROM message_replies\n                WHERE id = $1\n                RETURNING id", [id])];
                    case 1:
                        result = _a.sent();
                        reply = result.rows[0];
                        if (!reply)
                            throw new expressError_1.NotFoundError("Message does not exist!");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Reply;
}());
exports.default = Reply;
