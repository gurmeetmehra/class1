
import React, { useState, useEffect } from 'react';

const BillingExpense = () => {
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseName, setExpenseName] = useState('');

    // Local Storage se saved data load karein
    const [expenses, setExpenses] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('billingExpenses') || '[]'
            );
        } catch {
            return [];
        }
    });

    // Auto Increment ID: next ID ko persist karein
    const [nextID, setNextID] = useState(() => {
        const savedNextID = Number(
            localStorage.getItem('billingExpenseNextID')
        );

        if (savedNextID > 0) return savedNextID;

        const savedExpenses = (() => {
            try {
                return JSON.parse(
                    localStorage.getItem('billingExpenses') || '[]'
                );
            } catch {
                return [];
            }
        })();

        return savedExpenses.reduce(
            (max, item) => Math.max(max, Number(item.ID) || 0),
            0
        ) + 1;
    });

    // Data aur next ID ko Local Storage mein save rakhein
    useEffect(() => {
        localStorage.setItem(
            'billingExpenses',
            JSON.stringify(expenses)
        );
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem(
            'billingExpenseNextID',
            String(nextID)
        );
    }, [nextID]);

    // Submit button
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!expenseName.trim() || expenseAmount === '') {
            alert('Please enter Expense Name and Amount');
            return;
        }

        const amount = Number(expenseAmount);

        if (!Number.isFinite(amount) || amount <= 0) {
            alert('Please enter a valid amount greater than 0');
            return;
        }

        const newExpense = {
            ID: nextID,
            expenseName: expenseName.trim(),
            expenseAmount: amount
        };

        // Grid mein add karein
        setExpenses(prev => [...prev, newExpense]);

        // Next ID increment karein
        setNextID(prev => prev + 1);

        setExpenseName('');
        setExpenseAmount('');

        alert('Expense saved successfully!');
    };

    // Delete expense
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            setExpenses(prev =>
                prev.filter(item => item.ID !== id)
            );
        }
    };

    return (
        <div style={styles.container}>
            <h1>Billing Expense</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Expense Name:</label>
                <input
                    type="text"
                    placeholder="Enter Expense Name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />

                <label>Expense Amount:</label>
                <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter Expense Amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />

                <button type="submit" style={styles.button}>
                    Submit
                </button>
            </form>

            <h2>Expense List</h2>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Expense Name</th>
                            <th style={styles.th}>Expense Amount</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={styles.td}>
                                    No expenses found
                                </td>
                            </tr>
                        ) : (
                            expenses.map((item) => (
                                <tr key={item.ID}>
                                    <td style={styles.td}>{item.ID}</td>
                                    <td style={styles.td}>
                                        {item.expenseName}
                                    </td>
                                    <td style={styles.td}>
                                        ₹{Number(item.expenseAmount).toFixed(2)}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.ID)}
                                            style={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                    {expenses.length > 0 && (
                        <tfoot>
                            <tr>
                                <td colSpan="2" style={styles.total}>
                                    Total Expense
                                </td>
                                <td colSpan="2" style={styles.total}>
                                    ₹
                                    {expenses.reduce(
                                        (sum, item) =>
                                            sum + Number(item.expenseAmount),
                                        0
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        marginBottom: '30px'
    },
    input: {
        padding: '10px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },
    tableContainer: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '15px'
    },
    th: {
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'left'
    },
    td: {
        padding: '12px',
        border: '1px solid #ddd'
    },
    total: {
        padding: '12px',
        border: '1px solid #ddd',
        fontWeight: 'bold'
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '7px 12px',
        border: 'none',
        cursor: 'pointer'
    }
};

export default BillingExpense;
