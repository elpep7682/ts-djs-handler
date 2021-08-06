import { Event } from "../../Interfaces";
import { bold, underline } from "colors";
export const event: Event = {
  name: "ready",
  emiter: "on",
  run: (client) => {
    var cmds: number = client.commands.size;
    var dac: string = "comandos",
      text: string = cmds === 0 ? dac.replace("s", "") : dac;

    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);

    console.log(
      bold.red("+ ") +
        `Bot conectado como ` +
        underline(client.user!.tag) +
        `\n` +
        bold.red("+ ") +
        `${cmds + " " + text} y ${client.events.size} eventos registrados.`
    );
  },
};
