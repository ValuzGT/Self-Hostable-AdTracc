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
class TagSourceCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-source', {
            category: 'tag',
            channel: 'guild',
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            description: {
                content: 'Get tag source',
                usage: '<name/alias>',
            },
            args: [
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag's source do you want to get?`,
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
                return msg.channel.send(`Tag \`${name}\` does not exist, check \`${prefix}tags\``);
            msg.channel.send(tag.content, { code: true });
        });
    }
}
exports.default = TagSourceCommand;
