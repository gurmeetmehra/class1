import React from 'react'

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
            <input type="text" placeholder="Enter Expense Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
            />

        </div>
    );
};

export default BillingExpense;