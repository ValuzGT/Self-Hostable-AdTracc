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
const discord_akairo_1 = require("discord-akairo");
class SetLimitCommand extends discord_akairo_1.Command {
    constructor() {
        super('setlimit', {
            ownerOnly: true,
            aliases: ['setlimit'],
            category: 'verification',
            description: {
                content: 'Sets the limit for a specific code',
            },
            args: [
                {
                    id: 'code',
                    type: 'activationCode',
                    prompt: {
                        start: (msg) => `${msg.author}, What code would you like to change the limit for?`,
                        retry: (msg) => `${msg.author}, please specify a valid code.`,
                    }
                },
                {
                    id: 'limit',
                    type: 'integer',
                    prompt: {
                        start: (msg) => `${msg.author}, What would you like to change the limit to?`,
                        retry: (msg) => `${msg.author}, Input a valid integer.`,
                    }
                }
            ]
        });
    }
    exec(msg, { code, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield code.updateOne({ limit }).exec();
            return msg.channel.send(`Set limit for ${code._id} to ${limit}`);
        });
    }
}
exports.default = SetLimitCommand;
