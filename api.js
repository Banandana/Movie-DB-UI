var Client = require('node-rest-client').Client;

var restClient = new Client();

var apiPath = "https://api.themoviedb.org/3";

var apiKey = '';
var authToken = '';

function handleCallback(callback, data) {
	if (typeof callback === 'function') {
		callback(data);
	}
}

module.exports = {
	init: function(key) {
		apiKey = key;
	},

	auth: function(callback) {
		restClient.get(apiPath + '/authentication/token/new', {
			parameters: {
				api_key: apiKey
			}
		}, function(data) {
			if (data.success) {
				authToken = data.request_token;
			}
			handleCallback(callback, data);
		});
	},

	popularFilm: function(callback) {
		restClient.get(apiPath + '/movie/popular', {
			parameters: {
				api_key: apiKey
			}
		}, function(data) {
			handleCallback(callback, data);
		});
	},

	searchFilm: function(text, page, callback) {
		restClient.get(apiPath + '/search/movie', {
			parameters: {
				api_key: apiKey,
				query: text,
				page: page
			}
		}, function(data) {
			handleCallback(callback, data);
		});
	},

	getFilm: function(filmId, callback) {
		restClient.get(apiPath + '/movie/${id}', {
			path: {
				id: filmId
			},
			parameters: {
				api_key: apiKey
			}
		}, function(data) {
			handleCallback(callback, data);
		});
	},

	getCredits: function(filmId, callback) {
		restClient.get(apiPath + '/movie/${id}/credits', {
			path: {
				id: filmId
			},
			parameters: {
				api_key: apiKey
			}
		}, function(data) {
			handleCallback(callback, data);
		});
	},
};