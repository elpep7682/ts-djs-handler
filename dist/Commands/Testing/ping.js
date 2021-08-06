"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ping",
    aliases: ["test"],
    run: async (_client, message) => {
        const latency = Date.now() - message.createdTimestamp;
        message.channel.send({
            content: `Pong!\nEnviado en \`` +
                latency + // Milisegundos
                "ms`, `" +
                (latency / 1000).toFixed(1) + // Segundos
                `s\``,
        });
    },
};
//# sourceMappingURL=ping.js.map