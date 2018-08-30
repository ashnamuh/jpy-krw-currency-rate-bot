const requestPromise = require('request-promise-native');

const currencyUrl = 'https://free.currencyconverterapi.com/api/v6/convert?compact=ultra&q=JPY_KRW';

const getJpyCurrencyRate = currencyAmount => {
	currencyAmount = (currencyAmount) ? currencyAmount : 1;
	return requestPromise(currencyUrl)
		.then(result => {
			const currentJpyRate = JSON.parse(result).JPY_KRW;
			return currencyAmount * currentJpyRate;
		})
		.catch(err => {
			console.log(err);
			console.log('^ err');
		});
};

module.exports = {
	getJpyCurrencyRate
};
