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
const code_1 = require("../../model/code");
const functions_1 = require("../../util/functions");
class GenerateCommand extends discord_akairo_1.Command {
    constructor() {
        super('generate', {
            aliases: ['generate'],
            category: 'verification',
            ownerOnly: true,
            description: {
                content: 'Generates an activation code',
            },
            args: [
                {
                    id: 'customer',
                    type: 'user',
                    prompt: {
                        start: (msg) => `${msg.author}, who would you like to generate a code for?`,
                        retry: (msg) => `${msg.author}, please specify a valid user.`,
                    },
                },
                {
                    id: 'limit',
                    type: 'integer',
                    prompt: {
                        start: (msg) => `${msg.author}, How many times can this code be used?`,
                        retry: (msg) => `${msg.author}, please specify a valid integer.`,
                    },
                }
            ]
        });
    }
    exec(msg, { customer, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            let generatedCode = functions_1.randomAlphanumericString(5);
            if (yield code_1.CodeModel.exists({ _id: generatedCode })) {
                while (yield code_1.CodeModel.exists({ _id: generatedCode })) {
                    generatedCode = functions_1.randomAlphanumericString(5);
                }
            }
            if (yield code_1.CodeModel.exists({ owner: customer.id }))
                return msg.channel.send(`This user already has a code!`);
            yield code_1.CodeModel.create({
                _id: generatedCode,
                owner: customer.id,
                limit: limit
            });
            const activationLog = this.client.channels.cache.get('863264377553158154');
            client.channels.cache.get('863572038841401354').send('Hello here!')
            return msg.channel.send(`Generated new code for **${customer.tag}** | **Code:** ${generatedCode}`);
        });
    }
}
exports.default = GenerateCommand;
