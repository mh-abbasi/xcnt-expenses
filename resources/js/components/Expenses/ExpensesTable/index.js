import React, {useEffect, useState} from 'react';
import {Table, TableHead, TableCell, TableBody, TableRow, TableSortLabel, TableFooter, TablePagination} from "@material-ui/core";
import ExpenseRow from "./ExpenseRow";
import {makeStyles} from "@material-ui/core/styles";
import shortid from "shortid";
import {ContainerWithOverflowX} from "../elements";

const useStyles = makeStyles({
    table: {
        margin: '20px 0'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    pagination: {
        display:'flex',
        justifyContent: 'left',
        width: "100%",
        alignItems: 'left',
        padding:'0px',
        borderBottom: 'none',
        marginTop: '15px',
    }
});

const headers = [
    {
        label: 'Description',
        id: 'description'
    },
    {
        label: 'Amount',
        id: 'amount',
    },
    {
        label: 'Currency',
        id: 'currency',
    },
    {
        label: 'Employee',
        id: 'employee_id',
    },
    {
        label: 'Created At',
        id: 'created_at',
    },
    {
        label: 'Verified',
        id: 'verified',
    }
];

const ExpensesTable = ({expenses, employees, orderBy, sortBy, onOrderChange, onStatusChange, currentPage, from, to, total, perPage, onPaginate}) => {
    const classes = useStyles();
    const createOrderRequest = (id) => {
        const sort = ( id === orderBy )
            ?
            (sortBy === 'desc') ? 'asc' : 'desc'
            :
            'desc';
        onOrderChange( id, sort )
    };

    const handleChangePage = (ev, page) => {
        onPaginate(page+1);
    };
    return (
        <ContainerWithOverflowX>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headers.map(header => {
                            return (
                                <TableCell
                                    key={shortid.generate()}
                                    align={'left'}
                                    data-sortkey={header.id}
                                    data-orderby={orderBy === header.id ? sortBy : false}
                                    padding={'default'}
                                    onClick={()=> {createOrderRequest(header.id)}}
                                    sortDirection={orderBy === header.id ? sortBy : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === header.id}
                                        direction={orderBy === header.id ? sortBy : 'desc'}
                                    >
                                        {header.label}
                                        {orderBy === header.id ? (
                                            <span className={classes.visuallyHidden}>
                                    {sortBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map(expense => (
                        <ExpenseRow expense={expense} employees={employees} key={expense.uuid} onStatusChange={onStatusChange} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            className={classes.pagination}
                            rowsPerPageOptions={[]}
                            count={total}
                            from={from}
                            rowsPerPage={perPage}
                            page={currentPage-1}
                            onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </ContainerWithOverflowX>

    );
};

export default ExpensesTable
