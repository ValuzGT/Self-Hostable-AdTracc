"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const discord_js_1 = require("discord.js");
/*
    This class can be used to manage caches for anything;
    It was originally created to manage the cache for github issue referencing
    But it is written in a way that it can be initialised and used to manage any cache
*/
class CacheManager {
    constructor(expiredMS) {
        this.expiredMS = expiredMS;
        this.store = new discord_js_1.Collection();
        this.time = new discord_js_1.Collection();
    }
    isInCache(key) {
        if (this.store.has(key))
            return true;
        return false;
    }
    getValue(key) {
        if (this.store.has(key) && this.time.has(key))
            return this.store.get(key);
        return null;
    }
    getLastUpdate(key) {
        if (this.time.has(key) && this.store.has(key))
            return this.time.get(key);
        return null;
    }
    addValue(key, value) {
        this.store.set(key, value);
        this.time.set(key, Date.now());
        setTimeout(() => this.removeValue(key), this.expiredMS);
    }
    removeValue(key) {
        if (this.store.delete(key) && this.time.delete(key))
            return true;
        return false;
    }
    getType() {
        if (typeof this.store)
            return typeof this.store;
        return null;
    }
}
exports.CacheManager = CacheManager;
