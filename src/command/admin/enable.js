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
class EnableCommand extends discord_akairo_1.Command {
    constructor() {
        super('enable', {
            ownerOnly: true,
            aliases: ['enable'],
            category: 'admin',
            description: {
                content: 'Enables a server',
            },
            args: [
                {
                    id: 'server',
                    type: 'mhServer',
                    prompt: {
                        start: (msg) => `${msg.author}, What server would you like to enable?`,
                        retry: (msg) => `${msg.author}, please specify a valid server.`,
                    }
                },
            ]
        });
    }
    exec(msg, { server }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (server.activated === true)
                return msg.channel.send(`${server.minecraftServerName} is already enabled.`);
            yield server.updateOne({ activated: true }).exec();
            if (!this.client.serverNameCache.includes(server.minecraftServerName))
                this.client.serverNameCache.push(server.minecraftServerName.toLowerCase());
            return msg.channel.send(`Enabled ${server.minecraftServerName}`);
        });
    }
}
exports.default = EnableCommand;
