"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Inhibitor } = require('discord-akairo');
class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        });
        //TODO Store in mongo
        // noinspection JSMismatchedCollectionQueryUpdate
        this.blacklist = [];
    }
    exec(message) {
        return this.blacklist.includes(message.author.id);
    }
}
module.exports = BlacklistInhibitor;
