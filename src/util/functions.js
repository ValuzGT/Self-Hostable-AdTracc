"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayDiff = exports.removeMarkdownAndMentions = exports.randomAlphanumericString = void 0;
const discord_js_1 = require("discord.js");
// Thanks to https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomAlphanumericString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomAlphanumericString = randomAlphanumericString;
function removeMarkdownAndMentions(content, msg) {
    return discord_js_1.Util.escapeMarkdown(msg ? discord_js_1.Util.cleanContent(content, msg) : discord_js_1.Util.removeMentions(content));
}
exports.removeMarkdownAndMentions = removeMarkdownAndMentions;
// Thanks draem
function arrayDiff(aArray, bArray) {
    const added = bArray.filter(e => !aArray.includes(e));
    const removed = aArray.filter(e => !bArray.includes(e));
    return {
        added,
        removed,
    };
}
exports.arrayDiff = arrayDiff;
// export async function getServers(client: TraccClient, name: string) {
// 	if (client.serverCacheManager.isInCache(name)) {
// 		return client.serverCacheManager.getValue(name);
// 	}
// 	else {
// 		const server = await ServerModel.findOne({minecraftServerName: name});
// 		if (server) {
// 			client.serverCacheManager.addValue(name, server);
// 			return server;
// 		}
// 		return null;
// 	}
// }
