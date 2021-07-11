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
const traccCommand_1 = require("../../structure/command/traccCommand");
const getPermissionLevel_1 = require("../../util/permission/getPermissionLevel");
const permissionLevel_1 = require("../../util/permission/permissionLevel");
class PingCommand extends traccCommand_1.TraccCommand {
    constructor() {
        super('myLevel', {
            aliases: ['mylevel'],
            channel: 'guild',
            category: 'utility',
            description: {
                content: 'Show your permission level',
            },
        });
    }
    exec(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const permLevel = getPermissionLevel_1.getPermissionLevel(msg.author, this.client);
            msg.channel.send(`Your permission level is ${permLevel} (${permissionLevel_1.PermissionLevel[permLevel]})`);
        });
    }
}
exports.default = PingCommand;
