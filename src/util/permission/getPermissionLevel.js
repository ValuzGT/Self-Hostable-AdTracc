"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionLevel = void 0;
const permissionLevel_1 = require("./permissionLevel");
const permissionLevelFromRole_1 = require("./permissionLevelFromRole");
const roleType_1 = require("./roleType");
function getPermissionLevel(user, client) {
    var _a;
    if ((_a = client.ownerIds) === null || _a === void 0 ? void 0 : _a.includes(user.id))
        return permissionLevel_1.PermissionLevel.BotDeveloper;
    const mainGuild = client.guilds.cache.get(process.env.MAIN_SERVER_ID);
    // All role types
    const allRoles = Object.values(roleType_1.RoleType);
    const member = mainGuild === null || mainGuild === void 0 ? void 0 : mainGuild.members.cache.get(user.id);
    // If a member isn't in the main guild then they have no permissions.
    if (!member)
        return permissionLevel_1.PermissionLevel.Everyone;
    const roles = member.roles.cache.filter(memberRole => allRoles.includes(memberRole.name));
    if (roles.size < 1)
        return permissionLevel_1.PermissionLevel.Everyone;
    const highestRole = roles.sort((a, b) => a.position - b.position).last();
    if (!highestRole)
        return permissionLevel_1.PermissionLevel.Everyone;
    if (!(mainGuild === null || mainGuild === void 0 ? void 0 : mainGuild.roles.cache.some(role => role.name === highestRole.name)))
        throw new Error('role permission level is not defined');
    return permissionLevelFromRole_1.permissionLevelFromRole(highestRole.name);
}
exports.getPermissionLevel = getPermissionLevel;
