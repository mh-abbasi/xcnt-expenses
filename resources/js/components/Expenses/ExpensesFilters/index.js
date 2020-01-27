import React, {useEffect, useState} from 'react';
import {Grid, Select, MenuItem, FormControl, Button, Input, Tooltip} from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";

const ExpensesFilters = ({selectedEmployee, employees, onEmployeeChange, reloadData, getExpenses, searchValue, onSearchValueChange}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
                <Tooltip title='Clear Filter (Reload Data)'>
                    <Button onClick={reloadData}><Autorenew/></Button>
                </Tooltip>
                <Button onClick={getExpenses}>Apply Filters</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FormControl fullWidth>
                    <Select
                        value={selectedEmployee}
                        onChange={onEmployeeChange}
                    >
                        <MenuItem value="none">
                            <em>Select an employee...</em>
                        </MenuItem>
                        {employees.map(({uuid, first_name, last_name}) => (
                            <MenuItem key={uuid} value={uuid}>
                                {first_name} {last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FormControl fullWidth>
                    <Input
                        value={searchValue}
                        placeholder={'Search...'}
                        onChange={onSearchValueChange}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default ExpensesFilters
