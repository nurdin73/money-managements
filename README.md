# Laravel Starter APP :rocket:

## Minimum System Requirement :eyes:

- **System Operation :** Windows/Linux/MacOS
- **Processor :** I3 or higher
- **Memory :** 4GB RAM
- **PHP Version :** 8.1
- **Node JS :** ^20.0

## Application required :toolbox:

- Composer
- Web Server(Apache/NGINX/Xampp/etc.)
- PosgresQL / Mysql server

## Description Product

Starter App for laravel & react development

## Process instalation

- Clone the repo into your computer
- Open the folder and open in your terminal
- Type this command ``composer install``
- Type this command ``npm install``
- Copy file ``.env.example`` and rename the copy file to ``.env`` in this project
- After that. Generate the key of project using command ``php artisan key:generate``
- Create Database into your computer such as mysql or pgsql
- Open file ``.env`` and change the value with your credential database

  ```text
  DB_CONNECTION=pgsql
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_DATABASE=starter_app
  DB_USERNAME=postgres
  DB_PASSWORD=postgres
  ```

- After this. run this command
  
  ```bash
  php artisan migrate
  php artisan db:seed
  ```
- Instalation has been success

## Default account this system :green_circle:

| Account      | Email | Password   |
| :---        |    :----:   |          ---: |
| Admin      | <test@example.com>       | password   |

## Generate CRUD + Export API
```bash
php artisan gen
```

## Generate Redux File
```bash
php artisan gen:redux {path_api_url}
```

## Generate Redux File
```bash
php artisan gen:view {path_api_url}
```