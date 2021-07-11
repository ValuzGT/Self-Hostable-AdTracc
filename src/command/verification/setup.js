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
        super('setup', {
            aliases: ['setup'],
            category: 'verification',
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: 'MANAGE_GUILD',
            description: {
                content: 'Sets up your server to use AdTracc',
            },
            args: [
                {
                    id: 'serverName',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, What server would you like to watch for?`,
                        retry: (msg) => `${msg.author}, please specify a valid server.`,
                    }
                }
            ]
        });
    }
    exec(msg, { serverName }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            const codeInfo = yield code_1.CodeModel.findOne({ owner: msg.author.id });
            if (!codeInfo)
                return msg.channel.send(`You do not have access to use this command.`);
            // if (codeInfo.owner != msg.author.id) return msg.channel.send('You cannot use this code.');
            if (codeInfo.limit != undefined) {
                const currentGuildAmount = ((_a = codeInfo.servers.length) !== null && _a !== void 0 ? _a : 0);
                if (currentGuildAmount >= codeInfo.limit) {
                    return msg.channel.send('You have reached your max limit for this code, create a ticket to increase your limit.');
                }
            }
            if (yield server_1.ServerModel.exists({ minecraftServerName: serverName.toLowerCase(), guildID: msg.guild.id }))
                return msg.channel.send('This server is already linked, use the settings command to modify the setup');
            let newChannel;
            const currentServerModel = yield server_1.ServerModel.findOne({ guildID: msg.guild.id });
            const adChannelExists = msg.guild.channels.cache.some(channel => channel.name === 'ad-tracc');
            if (!adChannelExists || !currentServerModel) {
                newChannel = yield ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.channels.create('ad-tracc', {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: msg.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: this.client.user.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                }));
            }
            else {
                newChannel = msg.guild.channels.resolve(currentServerModel.logChannelID);
            }
            let servers = codeInfo.servers;
            if (!servers)
                servers = [];
            servers.push(serverName);
            yield codeInfo.updateOne({ servers: servers }).exec();
            this.client.serverNameCache.push(serverName.toLowerCase());
            yield server_1.ServerModel.create({ minecraftServerName: serverName.toLowerCase(), guildID: msg.guild.id, logChannelID: newChannel.id, activated: true });
            msg.channel.send(`Setup channel ${newChannel} for ${serverName}`);
        });
    }
}
exports.default = SetupCommand;
