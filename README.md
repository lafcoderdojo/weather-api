# CoderDojo Lafayette Weather API

This weather API is a simplified, unlisted API for use by CoderDojo Lafayette for private use in teaching and practicing web application development.

## API

`weather-api` requests updates from Dark Sky's current/forecast API every 500 seconds and caches it. When a request for current weather data comes into this API, it just serves the user the `currently: ...` portion of the cached Dark Sky response.

There are two endpoints currently provided by `weather-api`;

### / - current weather

The response is the `currently: ...` portion of the Dark Sky current weather / forecast response, unmodified.

### /diagnostics - debugging information

This response includes some remote debugging information, including a `lastModified` ISO date, and a `parseFailed` boolean status that becomes `true` if the last response from Dark Sky failed to parse as JSON.

## Deployment

CoderDojo Lafayette runs `weather-api` with the [PM2 process manager](http://pm2.keymetrics.io) behind Nginx as the firewall and reverse proxy, on DigitalOcean.

## License

`weather-api` is open-source and publicly available under a derivative variant of the MIT License, specified in `LICENSE`.

