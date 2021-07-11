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
const tag_1 = require("../../../model/tag");
const discord_js_1 = require("discord.js");
const lodash_1 = require("lodash");
const discord_js_pagination_ts_1 = require("discord.js-pagination-ts");
const permissionLevel_1 = require("../../../util/permission/permissionLevel");
const traccCommand_1 = require("../../../structure/command/traccCommand");
class TagListAliasesCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-listaliases', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'List all tag aliases',
            },
        });
    }
    exec(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const m = yield msg.channel.send(`${process.env.EMOJI_LOADING} Retrieving tag aliases.`);
            const tags = yield tag_1.TagModel.find();
            const aliases = [];
            tags.forEach(t => {
                if (t.aliases.length > 0)
                    t.aliases.forEach(a => aliases.push({ name: t.name, alias: a }));
            });
            if (aliases.length < 1) {
                return m.edit(`No tag aliases found`);
            }
            const items = aliases.map(a => `:small_orange_diamond: \`${a.alias}\` :point_right: \`${a.name}\``);
            const chunks = lodash_1.chunk(items, 16);
            const embeds = [];
            for (let i = 0; i < chunks.length; i++) {
                const page = i + 1;
                embeds.push(new discord_js_1.MessageEmbed()
                    .setDescription(lodash_1.truncate(chunks[i].join('\n'), {
                    length: 2000,
                }))
                    .setColor('ORANGE')
                    .setAuthor(`Listing tag aliases`)
                    .setFooter(`**__Showing page ${page} of ${chunks.length}**__`));
            }
            discord_js_pagination_ts_1.editMessageWithPaginatedEmbeds(m, embeds, {
                owner: msg.author,
                footer: `Showing page {current} of {max} • ${items.length} tag${items.length > 1 ? 's' : ''}`,
            });
        });
    }
}
exports.default = TagListAliasesCommand;
