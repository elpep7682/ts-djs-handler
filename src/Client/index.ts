import { Client, Collection } from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import { Command, Event, Config } from "../Interfaces";
import { token, prefix } from "../config.json";
import { config } from "dotenv";
config();

class TSClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config = { token, prefix };
  public aliases: Collection<string, Command> = new Collection();

  public async start({
    options: { error, clear },
  }: {
    // Interfaces
    options?: {
      error: "ignore" | "log" | "shutdown";
      clear: boolean;
    };
  }) {
    process.stdout.write("Iniciando...");
    this.login(process.env[token]).then(() => {
      process.stdout.clearLine(1);
      process.stdout.cursorTo(0);
      process.stdout.write("Bot conectandose...");
    });

    clear ? console.clear() : undefined;

    process.on(
      "unhandledRejection",
      async (rejection: PromiseRejectedResult) => {
        switch (error) {
          case "ignore":
            break;
          case "log":
            logReject();
            break;
          case "shutdown":
            logReject();
            process.exit(0);
        }
        function logReject() {
          console.log("Unhandled Rejection:", rejection);
          process.stdout.clearLine(1);
        }
      }
    );

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter(
        (file: string) => file.endsWith(".ts")
      );

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);
        if (command.aliases && command?.aliases.length !== 0) {
          command.aliases.forEach((alias: string) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });

    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (dir) => {
      const events = readdirSync(`${eventPath}/${dir}`).filter((file: string) =>
        file.endsWith(".ts")
      );

      for (const file of events) {
        const { event } = await import(`${eventPath}/${dir}/${file}`);

        this.events.set(event.name, event);
        this[event.emiter || "on"](event.name, event.run.bind(null, this));
      }
    });
  }
}

export default TSClient;
