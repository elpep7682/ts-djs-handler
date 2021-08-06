"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Client_1 = tslib_1.__importDefault(require("./Client"));
new Client_1.default({ intents: 5983 }).start({
    options: { error: "log", clear: true },
});
//# sourceMappingURL=index.js.map