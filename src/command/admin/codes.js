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
const code_1 = require("../../model/code");
class CodesCommand extends discord_akairo_1.Command {
    constructor() {
        super('codes', {
            ownerOnly: true,
            aliases: ['codes'],
            category: 'verification',
            description: {
                content: 'Sets the limit for a specific code',
            },
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: (msg) => `${msg.author}, Who would you like to look up codes for?`,
                        retry: (msg) => `${msg.author}, please specify a valid user.`,
                    }
                },
            ]
        });
    }
    exec(msg, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeModels = yield code_1.CodeModel.find({ owner: user.id });
            if (!codeModels)
                return msg.channel.send(`This user has no codes assigned to them!`);
            let userCodes = codeModels.map(model => `\`${model._id}\``);
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`${user.tag}'s codes`)
                .setColor('#32CD32')
                .setDescription(`${userCodes.join('\n')}`);
            return msg.channel.send(embed);
        });
    }
}
exports.default = CodesCommand;
