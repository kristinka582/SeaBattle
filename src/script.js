import App from "./App.js";
import PreparationCondition from "./PreparationCondition.js";
import BotCondition from "./BotCondition.js";

const app = new App({
	preparation: PreparationCondition,
	bot: BotCondition,
});

app.start('preparation');
