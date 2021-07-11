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
exports.TraccClient = void 0;
const discord_akairo_1 = require("discord-akairo");
const discord_akairo_2 = require("discord-akairo");
const constants_1 = require("../../util/constants");
const code_1 = require("../../model/code");
const server_1 = require("../../model/server");
const cooldownManager_1 = require("../../structure/cooldownManager");
class TraccClient extends discord_akairo_1.AkairoClient {
    constructor(options) {
        // TODO: validate options
        super({
            ownerID: options.ownerIds,
        }, {
            disableMentions: 'everyone',
        });
        this.ownerIds = options.ownerIds;
        this.mongo = options.mongo;
        this.mcBot = options.mcBot;
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: './src/command/',
            prefix: process.env.DISCORD_PREFIX,
            argumentDefaults: {
                prompt: {
                    modifyRetry: (_, str) => constants_1.MESSAGES.commandHandler.prompt.modifyRetry(str),
                    modifyStart: (_, str) => constants_1.MESSAGES.commandHandler.prompt.modifyStart(str),
                    timeout: constants_1.MESSAGES.commandHandler.prompt.timeout,
                    ended: constants_1.MESSAGES.commandHandler.prompt.ended,
                    cancel: constants_1.MESSAGES.commandHandler.prompt.cancel,
                    retries: 3,
                    time: 30000,
                },
            },
            commandUtil: true,
            allowMention: true,
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: './src/listener/',
        });
        this.inhibitorHandler = new discord_akairo_2.InhibitorHandler(this, {
            directory: './src/inhibitor/',
        });
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            minecraft: this.mcBot
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        // this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        // this.inhibitorHandler.loadAll();
        this.serverNameCache = [];
        this.tagCooldownManager = new cooldownManager_1.CooldownManager(10000);
        this.registerArgTypes();
    }
    start(token) {
        super.login(token);
    }
    registerArgTypes() {
        this.commandHandler.resolver.addType('handler', (_msg, phrase) => {
            if (!phrase)
                return null;
            switch (phrase.toLowerCase()) {
                case 'cmd':
                case 'command':
                    return this.commandHandler;
                case 'listener':
                case 'event':
                    return this.listenerHandler;
                case 'block':
                case 'check':
                case 'inhibitor':
                    return this.inhibitorHandler;
                default:
                    return null;
            }
        });
        this.commandHandler.resolver.addType('activationCode', (_msg, phrase) => __awaiter(this, void 0, void 0, function* () {
            if (!phrase)
                return null;
            const c = yield code_1.CodeModel.findOne({ _id: phrase });
            if (!c)
                return null;
            return c;
        }));
        this.commandHandler.resolver.addType('mhServer', (_msg, phrase) => __awaiter(this, void 0, void 0, function* () {
            if (!phrase)
                return null;
            const c = yield server_1.ServerModel.findOne({ minecraftServerName: phrase.toLowerCase() });
            if (!c)
                return null;
            return c;
        }));
    }
}
exports.TraccClient = TraccClient;
