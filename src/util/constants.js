"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
exports.MESSAGES = {
    commandHandler: {
        prompt: {
            modifyStart: (str) => `${str}\n\nType \`cancel\` to cancel the command.`,
            modifyRetry: (str) => `${str}\n\nType \`cancel\` to cancel the command.`,
            timeout: 'You took too long so the command has been cancelled.',
            ended: 'Be prepared next time. The command has been cancelled.',
            cancel: 'The command has been cancelled.',
        },
    },
    commands: {
        useHelp: (prefix, commandName) => `${process.env.EMOJI_AHH} I can help you more if you use \`${prefix}help ${commandName}\``,
    },
};
