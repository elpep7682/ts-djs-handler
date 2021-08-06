"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ping",
    aliases: ["getreal"],
    run: async (_client, message) => {
        return message.channel.send("pong?");
    },
};
//# sourceMappingURL=ping.js.map