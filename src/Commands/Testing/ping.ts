import { Command } from "../../Interfaces";
export const command: Command = {
  name: "ping",
  aliases: ["test"],
  run: async (_client, message) => {
    const latency = Date.now() - message.createdTimestamp;
    message.channel.send({
      content:
        `Pong!\nEnviado en \`` +
        latency + // Milisegundos
        "ms`, `" +
        (latency / 1000).toFixed(1) + // Segundos
        `s\``,
    });
  },
};
