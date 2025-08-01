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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParticipantsExists = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const checkParticipantsExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { contactId } = req.body;
    if (!userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
    }
    if (!contactId) {
        res.status(400).json({ message: "Se requiere ID del destinatario" });
        return;
    }
    try {
        const recipient = yield UserModel_1.default.findById(contactId);
        if (!recipient) {
            res.status(404).json({ message: "The user is no longer available" });
            return;
        }
        next();
    }
    catch (error) {
        console.error('Middleware checkParticipants - error:', error);
        res.status(500).json({
            message: "Error validating participants",
        });
        return;
    }
});
exports.checkParticipantsExists = checkParticipantsExists;
