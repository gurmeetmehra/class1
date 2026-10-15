import React from 'react'
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
    
const BillingExpense = () => {
    const [expenseAmount, setExpenseAmount] = useState('');

    const handleSubmit = () => {
        // Handle form submission
        console.log('Expense Amount:', expenseAmount);
    };

    return (
        <div>
            <h1>Billing Expense</h1>
            <TextField label="Enter Expense Amount"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </div>
    );
};

export default BillingExpense;