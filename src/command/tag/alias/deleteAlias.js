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
const traccCommand_1 = require("../../../structure/command/traccCommand");
const permissionLevel_1 = require("../../../util/permission/permissionLevel");
class TagSetAliasCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-deletealias', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Delete a tag alias',
                usage: '<alias>',
            },
            args: [
                {
                    id: 'alias',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag alias do you want to delete?`,
                    },
                },
            ],
        });
    }
    exec(msg, { alias }) {
        return __awaiter(this, void 0, void 0, function* () {
            alias = alias.replace(/\s+/g, '-').toLowerCase();
            const tag = yield tag_1.TagModel.findByNameOrAlias(alias);
            if (tag) {
                if (tag.name === alias)
                    return msg.channel.send(`\`${alias}\` is a name, not an alias`);
                else if (tag.aliases.includes(alias)) {
                    msg.channel.send(tag.aliases);
                    yield tag.updateOne({
                        aliases: tag.aliases.filter(a => a !== alias),
                    });
                    return msg.channel.send(`Deleted alias \`${alias}\``);
                }
            }
            else {
                return msg.channel.send(`Unknown alias \`${alias}\``);
            }
        });
    }
}
exports.default = TagSetAliasCommand;
