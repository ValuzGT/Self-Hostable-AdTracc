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
const lodash_1 = require("lodash");
const discord_js_1 = require("discord.js");
const constants_1 = require("../../util/constants");
const traccCommand_1 = require("../../structure/command/traccCommand");
const permissionLevel_1 = require("../../util/permission/permissionLevel");
class TagShowCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-show', {
            category: 'tag',
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            channel: 'guild',
            description: {
                content: 'Show specific tag',
                usage: '<name/alias>',
            },
            args: [
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag do you want to show?`,
                    },
                },
            ],
        });
    }
    exec(msg, { name }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            if (msg.guild.id != process.env.MAIN_SERVER_ID)
                return;
            name = name.replace(/\s+/g, '-').toLowerCase();
            const prefix = (this.handler.prefix);
            // Find tag with that name or alias
            const tag = yield tag_1.TagModel.findByNameOrAlias(name);
            if (!tag)
                return msg.channel.send(`Tag \`${name}\` does not exist, check \`${prefix}tags\``);
            if (this.client.tagCooldownManager.isOnCooldown(`t-${tag.name}-${msg.channel.id}`))
                return msg.react('⏲️');
            const matches = tag.content.match(constants_1.IMGUR_LINK_REGEX);
            const embed = new discord_js_1.MessageEmbed()
                .setColor('BLUE')
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
            let content = tag.content;
            if (matches) {
                const link = matches[0];
                content = tag.content.replace(link, '');
                embed.setImage(link);
            }
            embed.setDescription(lodash_1.truncate(content, { length: 2048 }));
            msg.channel.send(embed);
            this.client.tagCooldownManager.add(`t-${tag.name}-${msg.channel.id}`);
            yield tag.updateOne({ uses: tag.uses + 1 });
        });
    }
}
exports.default = TagShowCommand;
