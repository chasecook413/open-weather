const currentApi = require('./current');
global.config = require('./config').config;

(async () => {
	let cityData = await currentApi.getDataByCityName('Memphis');
	console.log(cityData);
})();