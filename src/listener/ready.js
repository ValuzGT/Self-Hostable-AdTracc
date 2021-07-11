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
const server_1 = require("../model/server");
class ReadyListener extends discord_akairo_1.Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });
    }
    exec() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Logged in as ${(_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
            const servers = yield server_1.ServerModel.find({ activated: true });
            servers.forEach(server => {
                const name = server.minecraftServerName.toLowerCase();
                this.client.serverNameCache.push(name);
            });
            (_b = this.client.user) === null || _b === void 0 ? void 0 : _b.setActivity('Minehut Advertisements', { type: 'WATCHING' });
        });
    }
}
exports.default = ReadyListener;
