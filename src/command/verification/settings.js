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
const discord_akairo_2 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const server_1 = require("../../model/server");
class SettingsCommand extends discord_akairo_1.Command {
    constructor() {
        super('settings', {
            aliases: ['settings', 'setting'],
            category: 'verification',
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: 'MANAGE_GUILD',
            description: {
                content: 'Changes ad-tracc settings for your server',
            },
        });
    }
    *args() {
        let prefix = this.handler.prefix;
        let embed;
        const server = yield {
            type: 'mhServer',
            otherwise: (msg) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!msg.guild)
                    return;
                const servers = yield server_1.ServerModel.find({ guildID: msg.guild.id });
                if (servers.length >= 1) {
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle(`${(_a = msg.guild) === null || _a === void 0 ? void 0 : _a.name} Settings`)
                        .setColor('#32CD32')
                        .setFooter(`Use ${prefix}settings <server name> <setting> <value/none> to modify`);
                    servers.forEach((server) => {
                        embed.addField('Server Name', server.minecraftServerName, false);
                        embed.addField('logchannel (Minecraft -> Discord -> Minecraft)', `<#${server.logChannelID}>`, true);
                        embed.addField('adchannel (embeded notifcations)', `${server.notifyAdChannelID ? `<#${server.notifyAdChannelID}>` : 'none'}`, true);
                    });
                }
                return embed !== null && embed !== void 0 ? embed : 'There are currently no linked servers';
            })
        };
        const setting = yield {
            type: ['logchannel', 'adchannel'],
            prompt: {
                start: (msg) => `${msg.author}, What setting do you want to change? (logchannel, adchannel)`,
                retry: (msg) => `${msg.author}, please specify a valid setting! (logchannel, adchannel)`,
            }
        };
        let argPromptMsg;
        if (setting == 'logchannel') {
            argPromptMsg = 'Please enter a valid channel for logs';
        }
        else if (setting == 'adchannel') {
            argPromptMsg = 'Please enter a valid channel for advertisement notifications';
        }
        const value = yield {
            type: discord_akairo_2.Argument.union('textChannel', 'none'),
            prompt: {
                start: (msg) => `${msg.author}, ${argPromptMsg} or none to disable`,
                retry: (msg) => `${msg.author}, Invalid argument! please try again!`,
            }
        };
        return { server, setting, value };
    }
    exec(msg, { server, setting, value }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            if (!server)
                return;
            // await ServerModel.updateOne({guildID: msg.guild.id} , { stuff });
            if (setting == 'logchannel') {
                if (value instanceof discord_js_1.TextChannel) {
                    yield server_1.ServerModel.updateOne({ minecraftServerName: server.minecraftServerName, guildID: msg.guild.id }, {
                        logChannelID: value.id
                    }).exec();
                    msg.reply(`✅ Successfully updated Log Channel setting to ${value}`);
                }
                else if (value === 'none') {
                    msg.reply(`❌ An error occurred: This cannot be disabled!`);
                }
                else {
                    msg.reply(`❌ An error occurred: Invalid Channel!`);
                }
            }
            if (setting === 'adchannel') {
                if (value instanceof discord_js_1.TextChannel) {
                    yield server_1.ServerModel.updateOne({ minecraftServerName: server.minecraftServerName, guildID: msg.guild.id }, {
                        notifyAdChannelID: value.id
                    }).exec();
                    msg.reply(`✅ Successfully updated Advertisement Notification Channel setting to ${value}`);
                }
                else if (value === 'none') {
                    yield server_1.ServerModel.updateOne({ minecraftServerName: server.minecraftServerName, guildID: msg.guild.id }, {
                        notifyAdChannelID: undefined
                    }).exec();
                    msg.reply(`✅ Successfully disabled advertisement notification embed`);
                }
                else {
                    msg.reply(`❌ An error occurred: Invalid Channel!`);
                }
            }
        });
    }
}
exports.default = SettingsCommand;
