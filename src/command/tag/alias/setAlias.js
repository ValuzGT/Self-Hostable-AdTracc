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
        super('tag-setalias', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Set a tag alias',
                usage: '<alias> <target>',
            },
            args: [
                {
                    id: 'alias',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what do you want the alias to be?`,
                    },
                },
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag do you want this alias to be added to?`,
                    },
                },
            ],
        });
    }
    exec(msg, { alias, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            alias = alias.replace(/\s+/g, '-').toLowerCase();
            name = name.replace(/\s+/g, '-').toLowerCase();
            const existingTarget = yield tag_1.TagModel.findByNameOrAlias(alias);
            // If alias already points to something, remove it from that something
            // OR if the alias already points to it and the user wanted to do that, say nothing changed
            if (existingTarget) {
                if (existingTarget.name === name || existingTarget.aliases.includes(name))
                    return msg.channel.send(':o: nothing changed');
                existingTarget.update({
                    aliases: existingTarget.aliases.filter(a => a !== alias),
                });
            }
            const target = yield tag_1.TagModel.findByNameOrAlias(name);
            if (!target)
                return msg.channel.send(`Unknown target \`${name}\``);
            yield target.updateOne({ $push: { aliases: alias } });
            target.aliases.push(alias);
            msg.channel.send(`${process.env.EMOJI_CHECK} \`${alias}\` now points to \`${name}\` (aliases: ${target.aliases.join(', ')})`);
        });
    }
}
exports.default = TagSetAliasCommand;
