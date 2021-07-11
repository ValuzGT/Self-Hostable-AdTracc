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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class MinecraftErrorListener extends discord_akairo_1.Listener {
    constructor() {
        super('mc-error', {
            emitter: 'minecraft',
            event: 'error',
        });
    }
    exec(err) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.client.channels.fetch(process.env.MINECRAFT_LOG_ID);
            channel.send(`Ad-Tracc Account errored: ${err}`);
            console.log(`Minecraft Bot error occurred: ${err}`);
        });
    }
}
exports.default = MinecraftErrorListener;
