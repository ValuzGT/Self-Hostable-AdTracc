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
const typegoose_1 = require("@typegoose/typegoose");
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const server_1 = require("../../model/server");
const serverstats_1 = require("../../model/serverstats");
class MinecraftAdvertisementListener extends discord_akairo_1.Listener {
    constructor() {
        super('mc-ad', {
            emitter: 'minecraft',
            event: 'chat:ad',
        });
    }
    exec(ad) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            //#miunehut-chat in bot category
            const channel = yield this.client.channels.fetch(process.env.mainlog);
            const adRank = ad[0][0] || 'Default';
            const advertiser = ad[0][1];
            const serverName = ad[0][2].toLowerCase();
            const adMessage = ad[0][3];
            const embed = new discord_js_1.MessageEmbed()
                .addField('**Rank:**', `${adRank}`, true)
                .addField('**Advertiser:**', `${advertiser}`, true)
                .addField('**Server Name:**', `${serverName}`, true)
                .addField('Advertisement Message', `\`${adMessage}\``)
                .setColor('#32CD32')
                .setTimestamp()
                .setAuthor((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.username, (_b = this.client.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL());
            channel.send(embed).catch(e => console.log(e));
            const name = serverName.toLowerCase();
            if (!this.client.serverNameCache.includes(name))
                return;
            const linkedServers = yield server_1.ServerModel.find({ minecraftServerName: serverName.toLowerCase() });
            const serverStats = yield serverstats_1.ServerStatModel.findOne({ minecraftServerName: serverName.toLowerCase() });
            if (!serverStats) {
                const statsCollection = new typegoose_1.mongoose.Types.Map();
                statsCollection.set(advertiser, 1);
                serverstats_1.ServerStatModel.create({ minecraftServerName: serverName.toLowerCase(), advertisementAmount: statsCollection });
            }
            else {
                if (serverStats.advertisementAmount) {
                    const count = (_c = serverStats.advertisementAmount.get(advertiser)) !== null && _c !== void 0 ? _c : 1;
                    serverStats.advertisementAmount.set(advertiser, count + 1);
                    serverStats.save();
                }
                else {
                    let updatedStats = new typegoose_1.mongoose.Types.Map();
                    updatedStats.set(advertiser, 1);
                    yield serverStats.updateOne({ advertisementAmount: updatedStats }).exec();
                }
            }
            if (linkedServers.length >= 1) {
                for (let server of linkedServers) {
                    const channel = yield this.client.channels.fetch(server.logChannelID);
                    channel.send(`\`${adRank}|&|${advertiser}|&|${serverName}|&|${adMessage}\``).catch(e => console.log(e));
                    if (server.notifyAdChannelID) {
                        if (server.notifyAdChannelID != 'none') {
                            const notifyAdChannel = this.client.channels.cache.get(server.notifyAdChannelID);
                            const embed = new discord_js_1.MessageEmbed()
                                .addField('**Rank:**', `${adRank}`, true)
                                .addField('**Advertiser:**', `${advertiser}`, true)
                                .addField('**Server Name:**', `${serverName}`, true)
                                .addField('Advertisement Message', `\`${adMessage}\``)
                                .setColor('#32CD32')
                                .setTimestamp()
                                .setAuthor(advertiser, `https://minotar.net/helm/${advertiser}.png)`);
                            notifyAdChannel.send(embed).catch(e => console.log(e));
                        }
                    }
                }
            }
        });
    }
}
exports.default = MinecraftAdvertisementListener;
