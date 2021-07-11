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
const traccClient_1 = require("./client/discord/traccClient");
const typegoose_1 = require("@typegoose/typegoose");
const minecraftClient_1 = __importDefault(require("./client/minecraft/minecraftClient"));
// { path: '../.env' }
require('dotenv').config();
// TODO: validate env variables
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connection = yield typegoose_1.mongoose.connect(process.env.MONGO_URI || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const auth = process.env.MINECRAFT_AUTH_TYPE;
    const minecraftClient = new minecraftClient_1.default({
        host: process.env.MINECRAFT_HOST,
        username: process.env.MINECRAFT_USERNAME,
        password: process.env.MINECRAFT_PASSWORD,
        version: process.env.MINECRAFT_VERSION,
        auth: auth
    });
    minecraftClient.start();
    const discordClient = new traccClient_1.TraccClient({
        ownerIds: (_a = process.env.OWNER_IDS) === null || _a === void 0 ? void 0 : _a.split(','),
        prefix: process.env.DISCORD_PREFIX || '!',
        mongo: connection,
        mcBot: minecraftClient.client
    });
    discordClient.start(process.env.DISCORD_TOKEN);
}))();
