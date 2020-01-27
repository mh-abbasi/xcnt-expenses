<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->uuid('uuid')->unique()->primary();
            $table->text('description');
            $table->float('amount');
            $table->string('currency');
            $table->uuid('employee_id');
            $table->foreign('employee_id')->references('uuid')->on('employees')->onDelete('cascade');
            $table->boolean('verified')->default(false);
            $table->dateTime('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
