import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import ExpensesFilters from "../ExpensesFilters";
import { httpCore } from "../../../common/httpClient"
import ExpensesTable from "../ExpensesTable";
import _ from "lodash";

const ExpensesTableWrapper = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('none');
    const [searchValue, setSearchValue] = useState('');
    const [employees, setEmployees] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [sortBy, setSortBy] = useState('desc');
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(5);

    const onEmployeeChange = (ev) => {
        setSelectedEmployee(ev.target.value);
    };

    const fetchEmployees = async () => {
        const result = await httpCore.getEmployees();
        setEmployees(result);
    };

    const onSearchValueChange = (ev) => {
        setSearchValue(ev.target.value);
    };

    const getExpenses = async (shouldRewind = false) => {
        const payload = {};
        payload.q = searchValue;
        if( selectedEmployee !== 'none' ) payload.employee = selectedEmployee;
        if( orderBy !== '' ) {
            payload.order_by = orderBy;
            payload.sort_by = sortBy;
        }
        payload.page = shouldRewind ? 1 : currentPage;
        const queryString = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
        const result = await httpCore.getExpenses(queryString);
        setExpenses(result.data);
        setCurrentPage(result.current_page)
        setCurrentPage(result.current_page)
        setMaxPage(result.last_page)
        setFrom(result.from)
        setTo(result.to)
        setTotal(result.total)
        setPerPage(result.per_page)
    };

    useEffect(() => {
        fetchEmployees();
        getExpenses();
    },[]);

    const reloadData = async () => {
        setExpenses([]);
        setSearchValue('');
        setSelectedEmployee('none');
        setCurrentPage(1);
        setSortBy('desc');
        setOrderBy('created_at');
        fetchEmployees();
        getExpenses();
    };

    const onOrderChange = (order, sort) => {
        setOrderBy(order);
        setSortBy(sort);
    };

    useEffect(()=>{ getExpenses() }, [orderBy, sortBy]);

    const onStatusChange = async (id, status) => {
        const result = await httpCore.updateExpense(id, status);
        if( result ) {
            let new_expenses = expenses;
            const obj_index = _.findIndex(new_expenses, {uuid: id});
            _.update(new_expenses, `[${obj_index}].verified`, () => { return status; });
            setExpenses([...new_expenses]);
        }
    };

    const onPaginate = (page) => {
        setCurrentPage(page);
    };

    useEffect(()=>{
        getExpenses()
    }, [currentPage, selectedEmployee])

    return (
        <Grid container>
            <Grid item xs={12}>
                <ExpensesFilters
                    selectedEmployee={selectedEmployee}
                    employees={employees}
                    onEmployeeChange={onEmployeeChange}
                    onSearchValueChange={onSearchValueChange}
                    reloadData={reloadData}
                    getExpenses={getExpenses}
                />
                <ExpensesTable
                    employees={employees}
                    expenses={expenses}
                    sortBy={sortBy}
                    orderBy={orderBy}
                    onOrderChange={onOrderChange}
                    onStatusChange={onStatusChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPage={maxPage}
                    from={from}
                    to={to}
                    perPage={perPage}
                    total={total}
                    onPaginate={onPaginate}
                />

            </Grid>
        </Grid>
    );
};

export default ExpensesTableWrapper
