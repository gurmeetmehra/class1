import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function ExpenseVoucher() {
  
  return (
    <div>
    <h1>Master Billing Expense</h1>
    <div>Expense Name</div>
    <TextField placeholder='Enter Expense Name'></TextField>
    <div>Expense Amount</div>
    <TextField placeholder='Enter Expense Amount'></TextField>
    <br/>
    <button>Submit</button>
    </div>
  )
}
