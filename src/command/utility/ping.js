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
class PingCommand extends discord_akairo_1.Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'utility',
            description: {
                content: 'Ping, pong',
            },
        });
    }
    exec(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const m = yield msg.channel.send(':ping_pong: Ping?');
            m.edit(`:ping_pong: Pong! (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~this.client.ws.ping}ms)`);
        });
    }
}
exports.default = PingCommand;
