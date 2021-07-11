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
const code_1 = require("../../model/code");
const server_1 = require("../../model/server");
class SetupCommand extends discord_akairo_1.Command {
    constructor() {
        super('unlink', {
            aliases: ['unlink'],
            category: 'verification',
            userPermissions: 'MANAGE_GUILD',
            description: {
                content: 'Unlinks a server from your discord server',
            },
            args: [
                {
                    id: 'serverName',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, What server would you like to unlink?`,
                        retry: (msg) => `${msg.author}, please specify a valid server.`,
                    }
                }
            ]
        });
    }
    exec(msg, { serverName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            const codeInfo = yield code_1.CodeModel.findOne({ owner: msg.author.id });
            if (!codeInfo)
                return msg.channel.send(`You do not have access to use this command.`);
            if (codeInfo.owner != msg.author.id)
                return msg.channel.send('You cannot use this code.');
            if (!(yield server_1.ServerModel.exists({ minecraftServerName: serverName.toLowerCase(), guildID: msg.guild.id })))
                return msg.channel.send('This server is not linked');
            let guilds = codeInfo.guilds;
            guilds.splice(codeInfo.guilds.indexOf(msg.guild.id));
            yield codeInfo.updateOne({ guilds: guilds }).exec();
            yield server_1.ServerModel.deleteOne({ minecraftServerName: serverName.toLowerCase(), guildID: msg.guild.id }).exec();
            msg.channel.send(`Unlinked server ${serverName}`);
        });
    }
}
exports.default = SetupCommand;
