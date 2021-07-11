"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionLevel = void 0;
var PermissionLevel;
(function (PermissionLevel) {
    PermissionLevel[PermissionLevel["Everyone"] = 0] = "Everyone";
    PermissionLevel[PermissionLevel["Customer"] = 1] = "Customer";
    PermissionLevel[PermissionLevel["Support"] = 2] = "Support";
    PermissionLevel[PermissionLevel["Developer"] = 3] = "Developer";
    PermissionLevel[PermissionLevel["Admin"] = 4] = "Admin";
    PermissionLevel[PermissionLevel["BotDeveloper"] = 100] = "BotDeveloper";
})(PermissionLevel = exports.PermissionLevel || (exports.PermissionLevel = {}));
