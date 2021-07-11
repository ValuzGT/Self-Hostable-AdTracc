"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const constants_1 = require("../../util/constants");
const traccCommand_1 = require("../../structure/command/traccCommand");
const permissionLevel_1 = require("../../util/permission/permissionLevel");
class TagCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('tag', {
            aliases: ['tag'],
            description: {
                content: `Manage tags.
				Available subcommands:
				• **show** \`<name/alias>\`
				• **set** \`<name> <content>\`
				• **setalias** \`<alias> <target>\`
				• **listaliases**
				• **deletealias** \`<alias>\`
				• **info** \`<name/alias>\`
				• **source** \`<name/alias>\`
				• **list \`[section]\`**
				• **rename** \`<old name> <new name>\`
				• **delete** \`<name>\`
				• **setsection** \`<name> <section>\`
				`,
                usage: '<method> <...arguments>',
            },
            category: 'tag',
            channel: 'guild',
            permissionLevel: permissionLevel_1.PermissionLevel.Support
        });
    }
    *args() {
        const method = yield {
            type: [
                ['tag-set', 'set'],
                ['tag-delete', 'delete'],
                ['tag-delete', 'del'],
                ['tag-show', 'show'],
                ['tag-list', 'list'],
                ['tag-info', 'info'],
                ['tag-rename', 'rename'],
                ['tag-source', 'source'],
                ['tag-listaliases', 'listaliases'],
                ['tag-setalias', 'setalias'],
                ['tag-deletealias', 'deletealias'],
                ['tag-deletealias', 'delalias'],
                ['tag-setsection', 'setsection']
            ],
            otherwise: (_msg) => {
                const prefix = (this.handler.prefix);
                return constants_1.MESSAGES.commands.useHelp(prefix, this.aliases[0]);
            },
        };
        return discord_akairo_1.Flag.continue(method);
    }
}
exports.default = TagCommand;
