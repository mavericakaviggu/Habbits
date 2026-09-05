import React, { useState } from 'react';
import '../styles/ExpenseTracker.css';

const ExpenseTracker = () => {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    const storageKey = `daily-expense-${dateKey}`;
    const [expense, setExpense] = useState(() => localStorage.getItem(storageKey) || '');

    const handleExpenseChange = (event) => {
        const value = event.target.value;
        setExpense(value);

        if (value) {
            localStorage.setItem(storageKey, value);
        } else {
            localStorage.removeItem(storageKey);
        }
    };

    const formattedDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className="expense-tracker" aria-labelledby="expense-tracker-label">
            <label id="expense-tracker-label" htmlFor="daily-expense">
                {formattedDate}
            </label>
            <input
                id="daily-expense"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={expense}
                onChange={handleExpenseChange}
                placeholder="Enter today's expense"
            />
        </section>
    );
};

export default ExpenseTracker;