import Bot from "./Client";
new Bot({ intents: 5983 }).start({
  options: { error: "log", clear: true },
});
