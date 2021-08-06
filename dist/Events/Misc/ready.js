"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const colors_1 = require("colors");
exports.event = {
    name: "ready",
    emiter: "on",
    run: (client) => {
        var cmds = client.commands.size;
        var dac = "comandos", text = cmds >= 0 ? dac.replace("s", "") : dac;
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        console.log(colors_1.bold.red("+ ") +
            `Bot conectado como ` +
            colors_1.underline(client.user.tag) +
            `\n` +
            colors_1.bold.red("+ ") +
            `${cmds + " " + text} y ${client.events.size} eventos registrados.`);
    },
};
//# sourceMappingURL=ready.js.map