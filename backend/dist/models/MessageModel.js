"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    sender: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    conversationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    isRead: { type: Boolean, default: false },
});
const MessageModel = mongoose_1.default.model("Message", messageSchema);
exports.default = MessageModel;
