const config = require('config');
const moment = require('moment');
const schedule = require('node-schedule');
const {getJpyCurrencyRate} = require('./lib/currency');
const telegramBot = require('./lib/telegram-bot');

schedule.scheduleJob('0 */1 * * *', () => {
	const now = moment().format('l LT');

	getJpyCurrencyRate(100)
		.then(rate => telegramBot.sendMessage(config.telegramBot.chatId, `${now} - 100JYP --> ${rate.toFixed(3)}KRW.`));
});

telegramBot.onText(/\/rate/, msg => {
	const chatId = msg.chat.id;

	getJpyCurrencyRate(100)
		.then(rate => telegramBot.sendMessage(chatId, `100JYP is ${rate.toFixed(3)}KRW now.`));
});
