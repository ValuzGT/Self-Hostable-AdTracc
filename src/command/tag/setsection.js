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
class TagSetSectionCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-setsection', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Set/edit the section of a tag',
                usage: '<name> <section>',
            },
            args: [
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what is the name of the tag?`,
                    },
                },
                {
                    id: 'section',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what should the tag's section be?`,
                    },
                },
            ],
        });
    }
    exec(msg, { name, section }) {
        return __awaiter(this, void 0, void 0, function* () {
            name = name.replace(/\s+/g, '-').toLowerCase();
            const prefix = (this.handler.prefix);
            // check if tag exists
            const tag = yield tag_1.TagModel.findByNameOrAlias(name);
            if (!tag) {
                return msg.channel.send(`${process.env.EMOJI_CROSS} tag \`${name}\` does not exist, check \`${prefix}tags\``);
            }
            yield tag.updateOne({ section });
            msg.channel.send(`${process.env.EMOJI_CHECK} tag \`${name}\`'s section is now \`${section}\``);
        });
    }
}
exports.default = TagSetSectionCommand;
