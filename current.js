const rp = require('request-promise');
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_URL = `${BASE_URL}/weather`;

/*
	You can call by city name or city name and country code. 
	API responds with a list of results that match a searching 
	word.
*/
const getDataByCityName = async (cityName, countryCode) => {
	// api.openweathermap.org/data/2.5/weather?q={city name}
	// api.openweathermap.org/data/2.5/weather?q={city name},{country code}	
	if (!cityName) {
		throw new Error('Must provide city name');
	}

	let options = {
		uri: WEATHER_URL,
		qs: {
			q: cityName,
			appid: config.api.openWeatherKey
		}
	}

	if (countryCode) {
		options.qs.q += `,${countryCode}`
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

/*
	You can call by city ID.
*/
const getDataByCityId = async (cityId) => {
	// api.openweathermap.org/data/2.5/weather?id=2172797
	if (!cityId) {
		throw new Error('Must provide city name');
	}

	let options = {
		uri: WEATHER_URL,
		qs: {
			id: cityId,
			appid: config.api.openWeatherKey
		}
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

/*
	You can call by city geographic coordinates.
*/
const getDataByGeographicCoordinates = async (lat, lon) => {
	// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
	if (!lat) {
		throw new Error('Must provide latitude.');
	}

	if (!lon) {
		throw new Error('Must provide longitude.');
	}

	let options = {
		uri: WEATHER_URL,
		qs: {
			lat: lat,
			lon: lon,
			appid: config.api.openWeatherKey
		}
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

const getDataByZipCode = async (zipCode, countryCode) => {
	// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}

	if (!zipCode) {
		throw new Error('Must provide zip code.');
	}

	if (!countryCode) {
		throw new Error('Must provide country code.');
	}

	let options = {
		uri: WEATHER_URL,
		qs: {
			zip: `${zipCode},${countryCode}`,
			appid: config.api.openWeatherKey
		}
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

const getDataWithinRectZone = async(bbox) => {
	// http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10
	if (!bbox) {
		throw new Error('Must provide bounding box.');
	}

	let options = {
		uri: `${BASE_URL}/box/city`,
		qs: {
			bbox: bbox,
			appid: config.api.openWeatherKey
		}
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

const getDataByCityIds = async(cityIds) => {
	// http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric
	if (!cityIds) {
		throw new Error('Must provide city name');
	}

	let options = {
		uri: WEATHER_URL,
		qs: {
			id: cityIds,
			appid: config.api.openWeatherKey
		}
	}

	try {
		let resp = await rp(options);
		if (resp.statusCode === 200) {
			throw new Error(`Error calling OpenWeatherMap: ${resp.statusCode}`);
		}

		return JSON.parse(resp);
	} catch (e) {
		throw new Error(`Error making API call: ${e.message}`);
	}
}

module.exports = { 
	getDataByZipCode: getDataByZipCode, 
	getDataByGeographicCoordinates: getDataByGeographicCoordinates, 
	getDataByCityId: getDataByCityId, 
	getDataByCityName: getDataByCityName,
	getDataWithinRectZone: getDataWithinRectZone,
	getDataByCityIds: getDataByCityIds
}