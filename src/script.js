const app = new App({
	preparation: PreparationCondition,
	bot: BotCondition,
});

app.start('preparation');
