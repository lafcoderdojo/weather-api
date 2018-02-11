const Express = require('express');
const server = Express();
const request = require('request');
const fs = require('fs');

const DARKSKY_API_KEY = fs.readFileSync('./key.txt', {encoding: 'utf8'}).trim();

const request_cache = {
    body: {
        message: 'No previous requests have gone out yet',
    },
    lastUpdated: new Date().toISOString(),
    parseFailed: false,
}

const getWeatherRequest = _ => {
    console.log('Getting another weather request');
    request(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/40.4167008,-86.8907654`, (err, resp, body) => {
        try {
            body = JSON.parse(body);
            request_cache.body = Object.assign({}, body);
            request_cache.parseFailed = false;
            request_cache.lastUpdated = new Date().toISOString();
        } catch (e) {
            console.log('Parse failed', e);
            request_cache.parseFailed = true;
        }
        setTimeout(getWeatherRequest, 500 * 1000);
    });
}

server.get('/', (req, res) => {
    console.log('GET /');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.end(
        JSON.stringify(
            request_cache.body.currently,
        )
    );
});

server.get('/diagnostics', (req, res) => {
    console.log('GET /diagnostics');
    res.end(
        JSON.stringify({
            ...request_cache,
            diagnostics: true,
        })
    )
})

getWeatherRequest()

server.listen(8080);

