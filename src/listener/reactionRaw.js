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
class ReactionRawListener extends discord_akairo_1.Listener {
    constructor() {
        super('reactionRaw', {
            emitter: 'client',
            event: 'raw',
        });
    }
    exec(packet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t))
                return;
            const channel = this.client.channels.cache.get(packet.d.channel_id);
            if (!channel || channel.messages.cache.has(packet.d.message_id))
                return; // if message is already cached don't emit again
            const message = yield channel.messages.fetch(packet.d.message_id);
            if (!message)
                throw new Error('Could not fetch message in reaction role raw');
            const emoji = packet.d.emoji.id
                ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
                : packet.d.emoji.name;
            const reaction = message.reactions.cache.get(emoji);
            if (!reaction)
                return;
            reaction.users.cache.set(packet.d.user_id, this.client.users.resolve(packet.d.user_id));
            switch (packet.t) {
                case 'MESSAGE_REACTION_ADD':
                    return this.client.emit('messageReactionAdd', reaction, this.client.users.resolve(packet.d.user_id));
                case 'MESSAGE_REACTION_REMOVE':
                    return this.client.emit('messageReactionRemove', reaction, this.client.users.resolve(packet.d.user_id));
            }
        });
    }
}
exports.default = ReactionRawListener;
