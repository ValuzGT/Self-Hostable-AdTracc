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
class TagRenameCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag-rename', {
            permissionLevel: permissionLevel_1.PermissionLevel.Support,
            category: 'tag',
            channel: 'guild',
            description: {
                content: 'Rename a tag',
                usage: '<old> <new>',
            },
            args: [
                {
                    id: 'oldName',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, which tag do you want to rename?`,
                    },
                },
                {
                    id: 'newName',
                    type: 'string',
                    prompt: {
                        start: (msg) => `${msg.author}, what should the tag's new name be?`,
                    },
                },
            ],
        });
    }
    exec(msg, { oldName, newName }) {
        return __awaiter(this, void 0, void 0, function* () {
            oldName = oldName.replace(/\s+/g, '-').toLowerCase();
            newName = newName.replace(/\s+/g, '-').toLowerCase();
            const prefix = (this.handler.prefix);
            // check if name tag exists
            // check if newName is already a name or alias
            const tag = yield tag_1.TagModel.findByNameOrAlias(oldName);
            if (!tag)
                return msg.channel.send(`Tag \`${oldName}\` does not exist, check \`${prefix}tags\``);
            oldName = tag.name;
            const tagWithNewName = yield tag_1.TagModel.findByNameOrAlias(newName);
            if (tagWithNewName)
                return msg.channel.send(`A tag with the new name/alias already exists`);
            yield tag.updateOne({ name: newName });
            msg.channel.send(`Tag \`${tag.name}\` is now \`${newName}\``);
        });
    }
}
exports.default = TagRenameCommand;
