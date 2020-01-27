<?php

namespace App\Http\Controllers;

use App\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public $keys = ['uuid', 'description', 'amount', 'currency', 'employee_id', 'verified', 'created_at'];

    public function getExpenses(Request $request){
        $sort_by = 'desc';
        $order_by = 'created_at';
        $expenses = false;
        if( $request->has('order_by') ) {
            $order_by = (in_array($request->get('order_by'), $this->keys)) ? $request->get('order_by') : $order_by;
            $sort_by = ( $request->has('sort_by') && in_array($request->get('sort_by'), ['asc','desc']) )
                ?
                $request->get('sort_by')
                :
                $sort_by;
        }
        if( $request->has('q') && $request->get('q') !== '' ) {
            $q = $request->get('q');
            $expenses = Expense::where('description', 'like',"%$q%");
        }
        if( $request->has('employee') && $request->get('employee') != '' ) {
            $employee_id = $request->get('employee');
            $expenses = ($expenses === false)
                ?
                Expense::where('employee_id', '=', $employee_id)
                :
                $expenses->where('employee_id', '=', $employee_id);
        }

        $expenses = ($expenses === false)
            ?
            Expense::orderBy($order_by, $sort_by)->paginate(5)
            :
            $expenses->orderBy($order_by, $sort_by)->paginate(5);
        return $expenses;
    }

    public function updateExpense(Request $request, Expense $expense) {
        $expense->verified = !!$request->get('status');
        if( $expense->save() ) {
            return 'ok';
        }
        return response('', 500);
    }
}
