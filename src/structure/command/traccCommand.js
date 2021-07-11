"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraccCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
const getPermissionLevel_1 = require("../../util/permission/getPermissionLevel");
const permissionLevel_1 = require("../../util/permission/permissionLevel");
class TraccCommand extends discord_akairo_1.Command {
    constructor(id, options) {
        super(id, options);
        this.permissionLevel = (options === null || options === void 0 ? void 0 : options.permissionLevel) || permissionLevel_1.PermissionLevel.Everyone;
        this.userPermissions = (msg) => {
            if (msg.author) {
                if (getPermissionLevel_1.getPermissionLevel(msg.author, this.client) < this.permissionLevel)
                    return this.permissionLevel;
                return null;
            }
            return null;
        };
    }
}
exports.TraccCommand = TraccCommand;
