/* Daily Tracker Component */
import React, { useState, useEffect } from 'react';
import HabitService from '../services/HabitService';
import HabitEntryService from '../services/HabitEntryService';
import '../styles/DailyTracker.css';

/**
 * Component to display today's habit tracking with radio buttons.
 * Shows current date and allows users to mark habits as complete.
 */
const DailyTracker = () => {
    const [habits, setHabits] = useState([]);
    const [completedHabits, setCompletedHabits] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodayData();
    }, []);

    /**
     * Load habits and today's completion status.
     */
    const loadTodayData = () => {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        
        // Load all active habits
        HabitService.getAllHabits()
            .then(response => {
                const activeHabits = response.data.filter(habit => habit.isActive);
                setHabits(activeHabits);
                
                // Check completion status for each habit
                const completionPromises = activeHabits.map(habit =>
                    HabitEntryService.getEntriesByDateRange(habit.id, today, today)
                        .then(entriesResponse => {
                            const todayEntry = entriesResponse.data.find(
                                entry => entry.entryDate === today && entry.completed
                            );
                            return { habitId: habit.id, completed: !!todayEntry };
                        })
                        .catch(() => ({ habitId: habit.id, completed: false }))
                );

                return Promise.all(completionPromises);
            })
            .then(completionStatuses => {
                const completed = new Set(
                    completionStatuses
                        .filter(status => status.completed)
                        .map(status => status.habitId)
                );
                setCompletedHabits(completed);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading today\'s data:', error);
                setLoading(false);
            });
    };

    /**
     * Toggle habit completion for today.
     * @param {number} habitId - The habit ID
     */
    const handleToggleCompletion = (habitId) => {
        const today = new Date().toISOString().split('T')[0];
        const isCompleted = completedHabits.has(habitId);

        HabitEntryService.createOrUpdateEntry({
            habitId: habitId,
            entryDate: today,
            completed: !isCompleted
        })
        .then(() => {
            setCompletedHabits(prev => {
                const updated = new Set(prev);
                if (isCompleted) {
                    updated.delete(habitId);
                } else {
                    updated.add(habitId);
                }
                return updated;
            });
        })
        .catch(error => console.error('Error updating entry:', error));
    };

    /**
     * Format today's date as "DD - Month - YYYY".
     */
    const formatDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day} - ${month} - ${year}`;
    };

    return (
        <div className="daily-tracker-container">
            <header className="tracker-header">
                <h2>{formatDate()}</h2>
            </header>

            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : habits.length === 0 ? (
                <p className="no-habits-message">No active habits to track today.</p>
            ) : (
                <div className="tracker-list">
                    {habits.map(habit => (
                        <div key={habit.id} className="tracker-item">
                            <label className="tracker-label">
                                <input
                                    type="checkbox"
                                    checked={completedHabits.has(habit.id)}
                                    onChange={() => handleToggleCompletion(habit.id)}
                                    aria-label={`Mark ${habit.name} as ${completedHabits.has(habit.id) ? 'incomplete' : 'complete'}`}
                                />
                                <span className={completedHabits.has(habit.id) ? 'completed-text' : ''}>
                                    {habit.name}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DailyTracker;
