const rp = require('request-promise');
const BASE_URL = 'api.openweathermap.org/data/2.5/weather';

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
		uri: BASE_URL,
		qs: {
			q: cityName
		}
	}

	if (countryCode) {
		options.qs.q += `,${countryCode}`;
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
		uri: BASE_URL,
		qs: {
			id: cityId
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
const getByGeographicCoordinates = async (lat, lon) => {
	// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
	if (!lat) {
		throw new Error('Must provide latitude.');
	}

	if (!lon) {
		throw new Error('Must provide longitude.');
	}

	let options = {
		uri: BASE_URL,
		qs: {
			lat: lat,
			lon: lon
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
		uri: BASE_URL,
		qs: {
			zip: `${zipCode},${countryCode}`
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