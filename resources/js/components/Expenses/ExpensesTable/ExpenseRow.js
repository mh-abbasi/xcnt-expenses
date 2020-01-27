import React, {useEffect, useState} from "react";
import {TableCell, TableRow, Switch} from "@material-ui/core";
import _ from "lodash";

const ExpenseRow = ({expense, employees, onStatusChange}) => {

    const { uuid, description, amount, currency, employee_id, verified, created_at } = expense;
    const getEmployeeFromId = (employee_id) => {
        const employee = _.find(employees,{uuid: employee_id});
        return employee ? `${employee.first_name} ${employee.last_name}` : employee_id
    };
    const createStatusChangeRequest = (ev) => {
        onStatusChange(uuid, ev.target.checked);
    };
    return (
        <TableRow>
            <TableCell>{description}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{currency}</TableCell>
            <TableCell>{getEmployeeFromId(employee_id)}</TableCell>
            <TableCell>{created_at}</TableCell>
            <TableCell>
                <Switch
                    checked={!!verified}
                    onChange={createStatusChangeRequest}
                    value="verified"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>
        </TableRow>
    )
};

export default ExpenseRow;
