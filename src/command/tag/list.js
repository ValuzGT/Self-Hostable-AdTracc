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
const tag_1 = require("../../model/tag");
const discord_js_1 = require("discord.js");
const lodash_1 = require("lodash");
const discord_akairo_1 = require("discord-akairo");
class TagListCommand extends discord_akairo_1.Command {
    constructor() {
        super('tag-list', {
            aliases: ['tags'],
            clientPermissions: ['EMBED_LINKS'],
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'List the tags',
            },
            args: [
                {
                    id: 'section',
                    type: 'string',
                    default: null,
                },
            ],
        });
    }
    exec(msg, { section }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield tag_1.TagModel.find().sort('name');
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor('ORANGE');
            const fields = {};
            for (const tag of tags) {
                if (!fields[tag.section || 'Uncategorized'])
                    fields[tag.section || 'Uncategorized'] = [];
                fields[tag.section || 'Uncategorized'].push(tag);
            }
            if (!section) {
                embed.setTitle(`Showing ${tags.length} tags`);
                for (const name in fields) {
                    const field = fields[name];
                    const mapped = lodash_1.truncate(field.map((t) => `\`${t.name}\``).join(', '), { length: 512 });
                    embed.addField(name, mapped, true);
                }
            }
            else {
                if (!fields[section])
                    return msg.channel.send(`Section \`${section}\` does not exist.`);
                embed.setTitle(`Showing ${fields[section].length} tags`);
                embed.addField(section, lodash_1.truncate(fields[section]
                    .map((t) => `\`${t.name}\``)
                    .join(', '), { length: 512 }));
            }
            msg.channel.send(embed);
        });
    }
}
exports.default = TagListCommand;
