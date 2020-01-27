<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{

    /**
     * Get all the employees for the select box in the table
     * @param Request $request
     * @return Employee[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getEmployees(Request $request)
    {
        return Employee::all();
    }
}
