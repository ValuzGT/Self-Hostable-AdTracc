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
const util_1 = require("util");
const constants_1 = require("../../util/constants");
const discord_akairo_1 = require("discord-akairo");
class EvalCommand extends discord_akairo_1.Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true,
            category: 'utility',
            description: {
                content: 'Evaluate JavaScript code',
                usage: '<expression>',
            },
            args: [
                {
                    id: 'expression',
                    match: 'text',
                },
            ],
        });
    }
    exec(msg, { expression, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = this.handler.prefix;
            if (!expression)
                return msg.channel.send(constants_1.MESSAGES.commands.useHelp(prefix, this.aliases[0]));
            let content;
            try {
                let evaled = eval(expression);
                if (typeof evaled !== 'string')
                    evaled = util_1.inspect(evaled);
                content = `\`\`\`xl\n${this.clean(evaled)}\`\`\``;
            }
            catch (err) {
                content = `\`ERROR\` \`\`\`xl\n${this.clean(err.toString())}\n\`\`\``;
            }
            if (content.length > 2000) {
                console.log(content);
                return msg.channel.send(`${process.env.EMOJI_WARNING} length of output exceeds character limit, logged output to console (${content.length}/2000)`);
            }
            msg.channel.send(content);
        });
    }
    clean(text) {
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(new RegExp(this.client.token, 'g'), '[token redacted]');
        return text;
    }
}
exports.default = EvalCommand;
