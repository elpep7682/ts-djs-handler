import { Command } from "../../Interfaces";
export const command: Command = {
  name: "ping",
  aliases: ["test"],
  run: async (_client, message) => {
    const latency = Math.floor(message.createdTimestamp - Date.now());
    message.reply({
      content:
        `Pong!\nEnviado en \`` +
        latency + // Milisegundos
        "ms`, `" +
        (latency / 1000).toFixed(1) + // Segundos
        `s\``,
    });
  },
};
