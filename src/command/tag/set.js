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
const traccCommand_1 = require("../../structure/command/traccCommand");
const permissionLevel_1 = require("../../util/permission/permissionLevel");
class TagSetCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-set', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Set/edit a tag',
                usage: '<section> <name> <content>',
            },
            args: [
                {
                    id: 'section',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what section does the tag belong in?`,
                    },
                },
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what should the tag be called? (spaces allowed)`,
                    },
                },
                {
                    id: 'content',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: (msg) => `${msg.author}, what should the tag's content be?`,
                    },
                },
            ],
        });
    }
    exec(msg, { section, name, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            name = name.replace(/\s+/g, '-').toLowerCase();
            const prefix = (this.handler.prefix);
            const tag = {
                section,
                name,
                content,
                author: msg.author.id,
                guild: msg.guild.id,
            };
            const conflictingTag = yield tag_1.TagModel.findByAlias(tag.name);
            if (conflictingTag)
                return msg.channel.send(`Tag name conflicts with \`${conflictingTag.name}\`'s aliases (use ${prefix}tag info ${conflictingTag.name})`);
            if (!(yield tag_1.TagModel.exists({ name }))) {
                tag_1.TagModel.create(tag);
                return msg.channel.send(`Tag \`${tag.name}\` created`);
            }
            else
                yield tag_1.TagModel.updateOne({ name }, tag);
            return msg.channel.send(`Tag \`${tag.name}\` updated`);
        });
    }
}
exports.default = TagSetCommand;
