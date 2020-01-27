<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=>['json']],function (){
    Route::prefix('expenses')->group(function () {
        Route::get('/', 'ExpenseController@getExpenses')->name('get-expenses');
        Route::put('/{expense}', 'ExpenseController@updateExpense')->name('update-expense');
    });
    Route::prefix('employees')->group(function () {
        Route::get('/', 'EmployeeController@getEmployees')->name('get-employees');
    });
});
