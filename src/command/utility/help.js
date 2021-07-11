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
class HelpCommand extends discord_akairo_1.Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: 'Lists available commands or displays detailed information for a specific command',
                usage: '[command]',
                examples: ['case', 'tag', 'ban', ''],
            },
            category: 'utility',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                },
            ],
        });
    }
    exec(msg, { command }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = this.handler.prefix;
            if (!command) {
                const embed = new discord_js_1.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('Commands')
                    .setDescription(`This is a list of available bot commands\nFor more information about a command, use **\`${prefix}help <command>\`**`);
                for (const category of this.handler.categories.values()) {
                    embed.addField(`${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`, category
                        .filter(cmd => cmd.aliases.length > 0)
                        .map(cmd => `\`${cmd.aliases[0]}\``)
                        .join(' '));
                }
                return msg.channel.send(embed);
            }
            const embed = new discord_js_1.MessageEmbed()
                .setColor(3447003)
                .setTitle(`\`${command.aliases[0]}${command.description.usage ? ` ${command.description.usage}` : ''}\``)
                .addField('Description', (_a = command.description.content) !== null && _a !== void 0 ? _a : '\u200b');
            if (command.aliases.length > 1)
                embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
            if ((_b = command.description.examples) === null || _b === void 0 ? void 0 : _b.length)
                embed.addField('Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``);
            return msg.channel.send(embed);
        });
    }
}
exports.default = HelpCommand;
