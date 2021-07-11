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
const discord_akairo_1 = require("discord-akairo");
const mineflayer_1 = __importDefault(require("mineflayer"));
class MinecraftEndListener extends discord_akairo_1.Listener {
    constructor() {
        super('mc-end', {
            emitter: 'minecraft',
            event: 'end',
        });
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                const channel = yield this.client.channels.fetch(process.env.MINECRAFT_LOG_ID);
                channel.send(`Ad-Tracc Account has lost connection or gone offline, attempting to reconnect...`);
                this.client.mcBot = mineflayer_1.default.createBot({
                    host: (_a = this.client.mcBot) === null || _a === void 0 ? void 0 : _a.customOptions.host,
                    username: (_b = this.client.mcBot) === null || _b === void 0 ? void 0 : _b.customOptions.username,
                    password: (_c = this.client.mcBot) === null || _c === void 0 ? void 0 : _c.customOptions.password,
                    version: (_d = this.client.mcBot) === null || _d === void 0 ? void 0 : _d.customOptions.version,
                    auth: (_e = this.client.mcBot) === null || _e === void 0 ? void 0 : _e.customOptions.auth
                });
                this.client.mcBot.addChatPattern('ad', /^\[AD\] *(\[.+\])* (\S+): \/join ([^\s]*) (.+)/, { repeat: true, parse: true });
            }), 30000);
        });
    }
}
exports.default = MinecraftEndListener;
