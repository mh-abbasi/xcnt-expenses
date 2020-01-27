<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $primaryKey = 'uuid';
    protected $guarded = [];
    protected $keyType = 'string';
    public $timestamps = false;
    public $incrementing = false;
    public function employee() {
        return $this->belongsTo(Employee::class, 'employee_id', 'uuid');
    }
}
