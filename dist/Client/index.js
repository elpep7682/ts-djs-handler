"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const config_json_1 = tslib_1.__importDefault(require("../config.json"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
class Extendedclient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    config = config_json_1.default;
    aliases = new discord_js_1.Collection();
    async init({ options: { error, clear } }) {
        process.stdout.write("Iniciando...");
        this.login(process.env.DISCORD_TOKEN).then(() => {
            process.stdout.clearLine(1);
            process.stdout.cursorTo(0);
            process.stdout.write("Bot conectandose...");
        });
        if (clear === true) {
            console.clear();
        }
        process.on("unhandledRejection", async (rejection) => {
            switch (error) {
                case "ignore":
                    break;
                case "onlylog":
                    logReject();
                    break;
                case "shutdown":
                    logReject();
                    process.exit(0);
            }
            function logReject() {
                console.log("Unhandled Rejection:", rejection);
            }
        });
        /* Commands */
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
        /* Events */
        const eventPath = path_1.default.join(__dirname, "..", "Events");
        fs_1.readdirSync(eventPath).forEach(async (file) => {
            const { event } = await Promise.resolve().then(() => tslib_1.__importStar(require(`${eventPath}/${file}`)));
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}
exports.default = Extendedclient;
//# sourceMappingURL=index.js.map