<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $primaryKey = 'uuid';
    protected $guarded = [];
    protected $keyType = 'string';
    public $incrementing = false;
    public function expenses() {
        return $this->hasMany(Expense::class, 'employee_id', 'uuid');
    }
}
