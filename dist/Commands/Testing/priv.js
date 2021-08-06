"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ping",
    aliases: ["getreal"],
    run: async (client, message, args) => {
        return message.channel.send("pong?");
    },
};
//# sourceMappingURL=priv.js.map