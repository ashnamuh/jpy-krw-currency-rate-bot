const schedule = require('node-schedule');
const config = require('config');
const {getJpyCurrencyRate} = require('./lib/currency');
const telegramBot = require('./lib/telegram-bot');

schedule.scheduleJob('*/1 * * * *', () => {
	getJpyCurrencyRate(100)
		.then(rate => telegramBot.sendMessage(config.telegramBot.chatId, rate.toFixed(3)));
});

telegramBot.onText(/\/rate/, msg => {
	const chatId = msg.chat.id;

	getJpyCurrencyRate(100)
		.then(rate => telegramBot.sendMessage(chatId, rate.toFixed(3)));
});
