import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {PaperBody} from "./elements";
import ExpensesTableWrapper from "./ExpensesTableWrapper";

const Expenses = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <PaperBody>
                        <ExpensesTableWrapper/>
                    </PaperBody>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Expenses
