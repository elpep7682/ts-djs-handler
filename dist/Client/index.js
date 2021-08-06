"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const config_json_1 = require("../config.json");
const dotenv_1 = require("dotenv");
dotenv_1.config();
class TSClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    config = { token: config_json_1.token, prefix: config_json_1.prefix };
    aliases = new discord_js_1.Collection();
    async start({ options: { error, clear }, }) {
        process.stdout.write("Iniciando...");
        this.login(process.env[config_json_1.token]).then(() => {
            process.stdout.clearLine(1);
            process.stdout.cursorTo(0);
            process.stdout.write("Bot conectandose...");
        });
        clear ? console.clear() : undefined;
        process.on("unhandledRejection", async (rejection) => {
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
        });
        const commandPath = path_1.default.join(__dirname, "..", "Commands");
        fs_1.readdirSync(commandPath).forEach((dir) => {
            const commands = fs_1.readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts"));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                if (command.aliases && command?.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });
        const eventPath = path_1.default.join(__dirname, "..", "Events");
        fs_1.readdirSync(eventPath).forEach(async (dir) => {
            const events = fs_1.readdirSync(`${eventPath}/${dir}`).filter((file) => file.endsWith(".ts"));
            for (const file of events) {
                const { event } = await Promise.resolve().then(() => tslib_1.__importStar(require(`${eventPath}/${dir}/${file}`)));
                this.events.set(event.name, event);
                this[event.emiter || "on"](event.name, event.run.bind(null, this));
            }
        });
    }
}
exports.default = TSClient;
//# sourceMappingURL=index.js.map