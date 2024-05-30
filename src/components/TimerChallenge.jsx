import { useState, useRef } from "react";
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTineRemaining] = useState(targetTime * 1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleTimerStart() {
        timer.current = setInterval(() => {
            setTineRemaining(prevTimeRemaining => prevTimeRemaining - targetTime * 10)
        }, targetTime * 10);
    }
    function handleTimerStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }
    
    if (timeRemaining <= 0 ) {
        clearInterval(timer.current);
        dialog.current.open();
    }
    function handleReset() {
        setTineRemaining(targetTime * 1000);
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} onReset={handleReset} timeRemaining={timeRemaining}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">{targetTime} second{targetTime > 1 ? "s" : undefined}</p>
                <p className={timerIsActive ? "active" : undefined}>
                    <button onClick={!timerIsActive ? handleTimerStart : handleTimerStop}>{timerIsActive ? "Stop": "Start"} Challenge</button>
                </p>
                <p>{timerIsActive ? "Timer is active" : "Timer is unactive"}</p>
            </section>
        </>
    )
}