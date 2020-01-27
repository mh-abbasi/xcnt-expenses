# XCNT Expense Verification Demo App

## Technologies Used
Project uses a number of open source projects to work properly:
   * [Laravel](https://laravel.com/) v6.12.0 - The PHP Framework for Web Artisans
   * [Composer](https://getcomposer.org/) - A Dependency Manager for PHP
   * [NPM](https://npmjs.com) v6.12.0 - NPM is a package manager for the JavaScript programming language
   * [React](https://reactjs.org/) v16.2.0 - A JavaScript library for building user interfaces   

## Server Machine Requirements
* PHP >= 7.2.0
* BCMath PHP Extension
* Ctype PHP Extension
* JSON PHP Extension
* Mbstring PHP Extension
* OpenSSL PHP Extension
* PDO PHP Extension
* Tokenizer PHP Extension
* XML PHP Extension
    
## How To Run The Project
Make sure that you have installed all the dependencies. There is no need to install Laravel on composer.
If you are using windows [Laragon](http://laragon.org/) can be a good choice for make it up and running without hassles.

Clone the repository:
```
git clone 
```
Navigate to project folder and run commands below:
```
# For installing backend dependencies
composer -vvv install
```
```
# For installing frontend dependencies
npm install && npm run dev
```
or
```
yarn install && yarn dev
```

You need a MySQL DB to run the app, Please create a DB (if using Laragon please run the servers first) and change the details in `.env` file in root folder.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=xcnt
DB_USERNAME=root
DB_PASSWORD=
```

then you can use the command `php artisan migrate` to create DB tables.
the last step to add records is running `php artisan cashcog:getdata` and leave the terminal it will get the data, Validate them and store them into the tables.



If you are using Laragon then you need just to navigate to project address usually `http://folderName.local/` and please change the `APP_URL` in `.env` file.
If you don't want to use Laragon you can use PHP built-in web server and run the project using `php artisan serve` and it will start a development server on `http://localhost:8000`. Please change `APP_URL` to this address please.


## Structure
* Models are in the `/app` folder called `Employee.php` and `Expense.php`
* The command for fetching data from API located in `/app/console/commands/GetCashcogData.php`
* Controllers for handling the API requests are located in `/app/Http/Controllers`
* All database migrations are located in `/database/migrations`
* Routes are located in `/routes` for normal views routes are stored in `web.php` and for api routes they are in `api.php`

## Way To Go

* If the real application has data frequency it's better to use time series databases, Something like [InfluxDB](https://www.influxdata.com/products/influxdb-overview/).
* Add tests to the main command and controller functions.
* Add fixed headers to the table.
* Add advanced search to the table, for example amount > 50 and employee X.
* Documenting the API using [Swagger](https://swagger.io/)
* Add custom exception handlers for having control to the error messages.
* Add Login view for the application
