"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionLevelFromRole = void 0;
const permissionLevel_1 = require("./permissionLevel");
const roleType_1 = require("./roleType");
function permissionLevelFromRole(role) {
    switch (role) {
        case roleType_1.RoleType.Customer:
            return permissionLevel_1.PermissionLevel.Customer;
        case roleType_1.RoleType.Support:
            return permissionLevel_1.PermissionLevel.Support;
        case roleType_1.RoleType.Developer:
            return permissionLevel_1.PermissionLevel.Developer;
        case roleType_1.RoleType.Admin:
            return permissionLevel_1.PermissionLevel.Admin;
        default:
            return permissionLevel_1.PermissionLevel.Everyone;
    }
}
exports.permissionLevelFromRole = permissionLevelFromRole;
