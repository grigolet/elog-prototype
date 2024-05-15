# ELOG prototype

## About

This is an experimental Laravel application that uses InertiaJS and React to render an electronic logbook application. The entry of the logbook is defined using
JSON schema, so that the admin users are able to define custom forms for the logbook entries.

## Run it

The code development happens using Laravel Sail. To run it, clone the repo and

```bash
composer install

sail up
```

To compile js and css assets run npm on a shell of the docker instance. Open a new shell where `sail` is accessible and

```bash
sail npm run dev
```

Visit `http://localhost`

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The software is open-sourced, licensed under the [MIT license](https://opensource.org/licenses/MIT).
