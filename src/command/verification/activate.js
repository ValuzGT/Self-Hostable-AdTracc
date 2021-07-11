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
class ActivateCommand extends discord_akairo_1.Command {
    constructor() {
        super('activate', {
            aliases: ['activate', 'redeem'],
            category: 'verification',
            userPermissions: 'MANAGE_GUILD',
            description: {
                content: 'Activates Ad-Tracc from a unique code',
            },
            args: [
                {
                    id: 'code',
                    type: 'activationCode',
                    prompt: {
                        start: (msg) => `${msg.author}, What code would you like to redeem?`,
                        retry: (msg) => `${msg.author}, please specify a valid code.`,
                    }
                }
            ]
        });
    }
    exec(msg, { code }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            if (code.owner != msg.author.id)
                return;
            if (code.guilds.includes(msg.guild.id))
                return msg.channel.send(`${msg.guild.name} already has Ad-Tracc enabled!`);
            let guilds = code.guilds;
            guilds.push(msg.guild.id);
            code = yield code.updateOne({
                guilds
            }).catch((e) => {
                msg.channel.send(`An error occured while saving your data, contact an administrator`);
                console.error(e);
            });
            msg.channel.send(`Ad-Tracc has been enabled for ${msg.guild.name}`);
            const activationLog = this.client.channels.cache.get(process.env.ACTIVATION_CHANNEL);
            activationLog.send(`${msg.author} used code ${code._id} to activate ${msg.guild.name} (${msg.guild.id})`);
        });
    }
}
exports.default = ActivateCommand;
