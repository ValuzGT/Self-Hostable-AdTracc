"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooldownManager = void 0;
const timeElapsed = (timestamp) => Date.now() - new Date(timestamp).getTime();
/*
    This class can be used to manage cooldowns for anything;
    It was originally created to manage cooldowns for individual tags in each channel
    But it is written in a way that it can be initialised and used to manage any cooldowns
*/
class CooldownManager {
    constructor(cooldown) {
        this.cooldown = cooldown;
        this.store = new Map();
    }
    // Might add/replace a method for checking how long left is on cooldown
    isOnCooldown(key) {
        if (!this.store.has(key))
            return false;
        if (timeElapsed(this.store.get(key)) > this.cooldown) {
            this.store.delete(key);
            return false;
        }
        else
            return true;
    }
    add(key) {
        this.store.set(key, Date.now());
    }
}
exports.CooldownManager = CooldownManager;
