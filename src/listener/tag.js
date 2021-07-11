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
const tag_1 = require("../model/tag");
const getPermissionLevel_1 = require("../util/permission/getPermissionLevel");
const permissionLevel_1 = require("../util/permission/permissionLevel");
class TagListener extends discord_akairo_1.Listener {
    constructor() {
        super('tag', {
            emitter: 'commandHandler',
            event: 'messageInvalid',
        });
    }
    exec(msg) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.guild && ((_b = (_a = msg.util) === null || _a === void 0 ? void 0 : _a.parsed) === null || _b === void 0 ? void 0 : _b.prefix)) {
                if (msg.guild.id != process.env.MAIN_SERVER_ID)
                    return;
                if (!((_d = (_c = msg.util) === null || _c === void 0 ? void 0 : _c.parsed) === null || _d === void 0 ? void 0 : _d.alias) || !((_f = (_e = msg.util) === null || _e === void 0 ? void 0 : _e.parsed) === null || _f === void 0 ? void 0 : _f.afterPrefix))
                    return;
                if (getPermissionLevel_1.getPermissionLevel(msg.author, this.client) < permissionLevel_1.PermissionLevel.Support)
                    return;
                const name = (_h = (_g = msg.util) === null || _g === void 0 ? void 0 : _g.parsed) === null || _h === void 0 ? void 0 : _h.afterPrefix.split(' ')[0];
                const tag = yield tag_1.TagModel.findByNameOrAlias(name.toLowerCase());
                if (!tag)
                    return;
                const command = this.client.commandHandler.modules.get('tag-show');
                return this.client.commandHandler.runCommand(msg, command, yield command.parse(msg, (_k = (_j = msg.util) === null || _j === void 0 ? void 0 : _j.parsed) === null || _k === void 0 ? void 0 : _k.afterPrefix));
            }
        });
    }
}
exports.default = TagListener;
