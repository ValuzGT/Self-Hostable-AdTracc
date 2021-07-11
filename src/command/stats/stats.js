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
const discord_js_1 = require("discord.js");
const serverstats_1 = require("../../model/serverstats");
class StatsCommand extends discord_akairo_1.Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            category: 'stats',
            channel: 'guild',
            description: {
                content: 'Checks server advertisement stats from a server for a player',
                usage: '<server name> <mc username>',
                examples: ['cmd ping'],
            },
            args: [
                {
                    id: 'server',
                    type: 'mhServer',
                    prompt: {
                        start: (msg) => `${msg.author}, What server would you like to check a user's stats from?`,
                        retry: (msg) => `${msg.author}, Please specify a valid server`,
                    }
                },
                {
                    id: 'username',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, Who would you like to lookup stats for?`,
                        retry: (msg) => `${msg.author}, Please specify a valid minecraft username`,
                    }
                }
            ]
        });
    }
    exec(msg, { server, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverStats = yield serverstats_1.ServerStatModel.findOne({ minecraftServerName: server.minecraftServerName });
            if (!(serverStats === null || serverStats === void 0 ? void 0 : serverStats.advertisementAmount.has(username)))
                return msg.channel.send('This user has no saved stats');
            const userStats = serverStats.advertisementAmount.get(username);
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Stats for ${server.minecraftServerName}`)
                .setColor('32CD32')
                .setAuthor(username, `https://minotar.net/helm/${username}.png)`)
                .addField('Advertisement Count', userStats);
            msg.channel.send(embed);
        });
    }
}
exports.default = StatsCommand;
