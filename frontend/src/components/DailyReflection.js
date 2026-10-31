import React, { useState } from 'react';
import '../styles/DailyReflection.css';

const ANSWERS = ['Yes', 'No', 'Fail'];

const DailyReflection = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    return (
        <section className="daily-reflection" aria-labelledby="daily-reflection-title">
            <h2 id="daily-reflection-title">Was today better than yesterday?</h2>
            <div className="daily-reflection-answers" role="group" aria-labelledby="daily-reflection-title">
                {ANSWERS.map((answer) => (
                    <button
                        key={answer}
                        type="button"
                        className="daily-reflection-answer"
                        aria-pressed={selectedAnswer === answer}
                        onClick={() => setSelectedAnswer(answer)}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default DailyReflection;