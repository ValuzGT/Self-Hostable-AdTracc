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
const discord_akairo_1 = require("discord-akairo");
class TagDeleteCommand extends discord_akairo_1.Command {
    constructor() {
        super('tag-delete', {
            ownerOnly: true,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Delete a tag',
                usage: '<name/alias>',
            },
            args: [
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag do you want to delete?`,
                    },
                },
            ],
        });
    }
    exec(msg, { name }) {
        return __awaiter(this, void 0, void 0, function* () {
            name = name.replace(/\s+/g, '-').toLowerCase();
            const prefix = (this.handler.prefix);
            // Find tag with that name or alias
            const tag = yield tag_1.TagModel.findByNameOrAlias(name);
            if (!tag)
                return msg.channel.send(`tag \`${name}\` does not exist, check \`${prefix}tags\``);
            if (tag.aliases.includes(name))
                return msg.channel.send(`\`${name}\` is an alias of \`${tag.name}\` -- you can delete the alias with \`${prefix}tag deletealias ${name}\`, or delete the entire tag with \`${prefix}tag delete ${tag.name}\``);
            yield tag.remove();
            msg.channel.send(`:wastebasket: tag \`${tag.name}\` deleted ${tag.aliases.length > 0 ? `(aliases: ${tag.aliases.join(', ')})` : ''}`);
        });
    }
}
exports.default = TagDeleteCommand;
