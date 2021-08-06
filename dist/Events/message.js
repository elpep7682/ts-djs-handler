"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
  name: "message",
  run: (client, message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.config.prefix)
    )
      return;
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) {
      command.run(client, message, args);
    }
  },
};
//# sourceMappingURL=message.js.map
