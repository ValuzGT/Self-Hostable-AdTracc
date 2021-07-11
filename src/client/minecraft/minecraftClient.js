"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mineflayer_1 = __importDefault(require("mineflayer"));
class MinecraftClient {
    constructor(options) {
        this.host = options.host;
        this.username = options.username;
        this.password = options.password;
        this.version = options.version;
        this.auth = options.auth;
        this.client;
        this.options = options;
        if (this.client)
            this.client.customOptions = this.options;
    }
    /*
    Moved events to listener folder, aswell as using the built in handler with discord-akairo
    */
    // async registerEvents() {
    //     const eventFiles = readdirSync(__dirname+'/events/').filter(file => file.endsWith('.ts'));
    //     for (const file of eventFiles) {
    //         const event = await import(`${__dirname}/events/${file}`);
    //         const name = file.replace('.ts', '') as keyof BotEvents;
    //         this.client?.on(name, (...args: any) => {
    //             new event.default().execute(...args);
    //         })
    //     }
    // }
    start() {
        this.client = mineflayer_1.default.createBot({
            host: this.host,
            username: this.username,
            password: this.password,
            version: this.version,
            auth: this.auth
        });
        this.client.addChatPattern('ad', /^\[AD\] *(\[.+\])* (\S+): \/join ([^\s]*) (.+)/, { repeat: true, parse: true });
        this.client.customOptions = this.options;
        // bind events
        // this.registerEvents();
    }
}
exports.default = MinecraftClient;
