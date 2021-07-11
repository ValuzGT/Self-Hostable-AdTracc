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
const constants_1 = require("../../util/constants");
const discord_akairo_1 = require("discord-akairo");
class ReloadCommand extends discord_akairo_1.Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            category: 'utility',
            channel: 'guild',
            ownerOnly: true,
            description: {
                content: 'Reload a module',
                usage: '<handler> <moduleid>',
                examples: ['cmd ping'],
            },
            args: [
                {
                    id: 'handler',
                    type: 'handler',
                },
                {
                    id: 'module',
                    type: 'string',
                },
            ],
        });
    }
    exec(msg, { handler, module, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = (this.handler.prefix);
            try {
                if (!handler || !module)
                    return msg.channel.send(constants_1.MESSAGES.commands.useHelp(prefix, this.aliases[0]));
                const mod = handler.reload(module);
                const proto = Object.getPrototypeOf(mod.constructor);
                msg.channel.send(`reloaded ${proto.name.toLowerCase()} \`${mod.id}\` ${mod.category ? `(${mod.category})` : ''}`);
            }
            catch (err) {
                const e = err;
                msg.channel.send(`${process.env.EMOJI_WARNING} ${e.message}`);
            }
        });
    }
}
exports.default = ReloadCommand;
