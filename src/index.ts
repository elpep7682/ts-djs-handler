import Bot from "./Client";
new Bot({
  intents: 5983,
  allowedMentions: { parse: ["users"], repliedUser: false },
}).start({
  options: { error: "log", clear: true },
});
