"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: "ready",
    run: (client) => {
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        console.log(`${client.user.tag} is onlinel`);
    },
};
//# sourceMappingURL=ready.js.map