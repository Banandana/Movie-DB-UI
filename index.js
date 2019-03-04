var express = require('express'),
    api = require('./api');

const app = express();

// Auth to api
var apiKey = 'b37a38e7e581371c9aa719f40e436c46';
api.init(apiKey);
api.auth(() => {});

// Set up routes
var port = 3000;

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: './public'
    });
});

app.get('/popularFilms', (req, res) => {
    api.popularFilm((data) => {
        res.send(data);
    });
});

app.get('/searchFilms', (req, res) => {
    var query = req.query.name ? req.query.name : '';
    var page = req.query.page ? req.query.page : '1';

    if (query === '') {
        return res.send(data);
    }

    api.searchFilm(query, page, (data) => {
        res.send(data);
    });
});

app.get('/getFilm', (req, res) => {
    var filmId = req.query.filmId;
    if (!filmId) {
        return res.send({});
    }

    api.getFilm(filmId, (data) => {
        api.getCredits(filmId, (credits) => {
            data.credits = credits;
            res.send(data);
        });
    });
});

app.use(express.static('public', {
    root: './public'
}));

app.listen(port, () => {
    console.log('Application is running');
});
