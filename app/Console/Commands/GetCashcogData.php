<?php

namespace App\Console\Commands;

use App\Employee;
use App\Expense;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Psr\Http\Message\ResponseInterface;
use \Exception;

/**
 * The command to get data from sample cashcog API
 * Class GetCashcogData
 * @package App\Console\Commands
 */
class GetCashcogData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cashcog:getdata';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to get data from cashcog API';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * This command will return positions of occurrences of a string in another string
     * @param $haystack
     * @param $needle
     * @return array
     */
    public function all_pos($haystack, $needle) {
        $lastPos = 0;
        $positions = array();

        while (($lastPos = strpos($haystack, $needle, $lastPos))!== false) {
            $positions[] = $lastPos;
            $lastPos = $lastPos + strlen($needle);
        }
        return $positions;
    }

    /**
     * This function gets expense details as array and employee uuid for saving the expense
     * @param $expense
     * @param $employee_id
     * @return bool
     */
    public function save_expense($expense, $employee_id) {
        // Validate $expense against the validator schema
        Validator::make($expense, [
            'uuid' => 'required|unique:expenses|uuid',
            'description' => 'required',
            'amount' => 'required|numeric|min:0.0',
            'currency' => 'required',
        ])->validate();
        if( $employee_id ) {
            $new_expense = new Expense(Arr::except($expense, 'created_at'));
            $new_expense->employee_id = $employee_id;
            // Convert created_at to a valid date for MySQL
            $new_expense->created_at = Carbon::createFromFormat( 'Y-m-d\TH:i:s', $expense['created_at']);
            return $new_expense->save();
        }
        return false;
    }

    /**
     * @param $employee
     * @return bool
     */
    public function save_employee($employee) {
        // Validate $employee against the validator schema
        Validator::make($employee, [
            'uuid' => 'required|uuid',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
        ])->validate();
        $new_employee = Employee::firstOrCreate($employee);
        return (isset($new_employee->uuid)) ? $new_employee->uuid : false;
    }

    /**
     * this function gets the whole API response JSON for an expense and call the functions to save the employee and expense separately
     * @param $array
     */
    public function save_data($array) {
        $expense = Arr::except($array, "employee");
        $employee = $array['employee'];
        try {
            $employee_id = $this->save_employee($employee);
            if( $employee_id ) {
                $this->save_expense($expense, $employee_id);
            }
        }
        catch (Exception $e) {
            echo $e->getMessage();
            // Do any kind of reports here
        }

    }

    /**
     * Execute the console command.
     * Algorithm description: It will read the stream till the stream send the EOF flag.
     * we are reading the data as chunks with a size that you can change it in /.env file.
     * it will try to read from the first index till occurrences of '}' in the concated string.
     * if the result is a valid JSON it means we have the desired object and it will try to save it and after that it will
     * change the concated_string to start from next index after '}' character till the end of concated_string itself.
     * and if couldn't find the object it will concat the string with concated_string to continue reading data
     * @return mixed
     */
    public function handle()
    {
        $endpoint = env('CASHCOG_API_URL').'/stream';
        $client = new Client();
        $response = $client->request('GET', $endpoint, ['stream' => true]);
        $body = $response->getBody();
        $concated_string = '';
        while (!$body->eof()) {
            $read = $body->read(env('CASHCOG_CHUNK_SIZE'));
            $closing_bracket_positions = $this->all_pos($concated_string, '}');
            $found = false;
            if( count($closing_bracket_positions) ) {
                foreach ( $closing_bracket_positions as $bracket_position ) {
                    if( !$found ) {
                        $result = json_decode(substr($concated_string, 0, $bracket_position+1), true);
                        if( $result != null ) {
                            $this->save_data($result);
                            $found = true;
                            $concated_string = substr($concated_string, $bracket_position+1, strlen($concated_string));
                        }
                        else {
                            $concated_string .= $read;
                        }
                    }

                }
            }
            else {
                $concated_string .= $read;
            }
        }
    }
}
