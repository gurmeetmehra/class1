import React, {useState} from 'react';
import {TextField} from "@mui/material";

export default function ExpenseVoucher() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    const [expenses, setExpenses] = useState(
        JSON.parse(localStorage.getItem("expenses")) || []
    );

    const handleSubmit = () => {
        const newExpense = {id: Date.now(), name: name.trim(), amount: Number(amount)};
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);

        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        // Clear form
        setName("");
        setAmount("");
    };

    return (<div>
        <h1>Master Billing Expense</h1>
        <div>Expense Name</div>
        <TextField placeholder='Enter Expense Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <div>Expense Amount</div>
        <TextField placeholder='Enter Expense Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <br/>
        <button onClick={handleSubmit}>Submit</button>

        <h2>Expense List</h2>

        {expenses.map((item, index) => (
            <div key={index}>
                <p>Expense Name: {item.name}</p>
                <p>Expense Amount: ₹{item.amount}</p>
                <hr />
            </div>
        ))}

    </div>)
}
