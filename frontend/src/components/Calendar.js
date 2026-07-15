/* Calendar Component */
import React, { useState, useEffect } from 'react';
import HabitService from '../services/HabitService';
import HabitEntryService from '../services/HabitEntryService';
import '../styles/Calendar.css';

/**
 * Component to display a calendar view of habit completions.
 * Shows habits as columns and dates as rows.
 */
const Calendar = () => {
    const [habits, setHabits] = useState([]);
    const [entries, setEntries] = useState({});
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([]);
    const [isAscending, setIsAscending] = useState(false);

    useEffect(() => {
        loadCalendarData();
    }, []);

    /**
     * Generate an array of dates for the last 30 days.
     */
    const generateDateRange = () => {
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i <= 29; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }
        
        return dates;
    };

    /**
     * Toggle the order of dates between ascending and descending.
     */
    const toggleOrder = () => {
        setIsAscending(prev => !prev);
    };

    /**
     * Get the date range in the current sort order.
     */
    const getOrderedDateRange = () => {
        return isAscending ? [...dateRange].reverse() : dateRange;
    };

    /**
     * Load habits and their completion entries for the date range.
     */
    const loadCalendarData = async () => {
        setLoading(true);
        const dates = generateDateRange();
        setDateRange(dates);

        try {
            // Load all habits in the same order as displayed in My Habits tab
            const habitsResponse = await HabitService.getAllHabits();
            const allHabits = habitsResponse.data;
            
            // Take only the first 10 habits as per requirement
            const habitsToDisplay = allHabits.slice(0, 10);
            setHabits(habitsToDisplay);

            // Load entries for each habit across the date range
            // dates[0] is today (latest), dates[dates.length - 1] is 29 days ago (earliest)
            const startDate = dates[dates.length - 1];
            const endDate = dates[0];
            
            const entriesMap = {};
            
            await Promise.all(
                habitsToDisplay.map(async (habit) => {
                    try {
                        const entriesResponse = await HabitEntryService.getEntriesByDateRange(
                            habit.id,
                            startDate,
                            endDate
                        );
                        
                        // Create a map of date -> completed status
                        entriesResponse.data.forEach(entry => {
                            const key = `${habit.id}-${entry.entryDate}`;
                            entriesMap[key] = entry.completed;
                        });
                    } catch (error) {
                        console.error(`Error loading entries for habit ${habit.id}:`, error);
                    }
                })
            );
            
            setEntries(entriesMap);
        } catch (error) {
            console.error('Error loading calendar data:', error);
        } finally {
            setLoading(false);
        }
    };



    /**
     * Format date for display (e.g., "Mon 15/06").
     * @param {string} dateStr - Date string (YYYY-MM-DD)
     */
    const formatDate = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${dayName} ${day}/${month}`;
    };

    /**
     * Check if a habit is completed on a specific date.
     * @param {number} habitId - The habit ID
     * @param {string} date - The date (YYYY-MM-DD)
     */
    const isCompleted = (habitId, date) => {
        const key = `${habitId}-${date}`;
        return entries[key] || false;
    };

    if (loading) {
        return (
            <div className="calendar-container">
                <div className="loading">Loading calendar...</div>
            </div>
        );
    }

    if (habits.length === 0) {
        return (
            <div className="calendar-container">
                <div className="no-habits">
                    <p>No habits to display. Create some habits first!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="calendar-title-row">
                    <div>
                        <h2>Habit Calendar</h2>
                        <p className="calendar-subtitle">
                            View your habit completion history
                        </p>
                    </div>
                    <button 
                        className="order-toggle-btn" 
                        onClick={toggleOrder}
                        title={`Currently showing ${isAscending ? 'oldest to newest' : 'newest to oldest'}. Click to change.`}
                    >
                        <span className="order-icon">{isAscending ? '↑' : '↓'}</span>
                        <span className="order-text">
                            {isAscending ? 'Oldest First' : 'Newest First'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="calendar-table-wrapper">
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th className="date-column">Date</th>
                            {habits.map(habit => (
                                <th key={habit.id} className="habit-column">
                                    <div className="habit-name" title={habit.name}>
                                        {habit.name}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getOrderedDateRange().map(date => (
                            <tr key={date}>
                                <td className="date-cell">
                                    {formatDate(date)}
                                </td>
                                {habits.map(habit => (
                                    <td
                                        key={`${habit.id}-${date}`}
                                        className={`habit-cell ${isCompleted(habit.id, date) ? 'completed' : ''}`}
                                        aria-label={`${habit.name} on ${formatDate(date)}: ${isCompleted(habit.id, date) ? 'completed' : 'not completed'}`}
                                    >
                                        {isCompleted(habit.id, date) && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
