import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef( function ResultModal ({onReset, targetTime, timeRemaining}, ref) {

    const dialog = useRef();
    const timeExpired = timeRemaining <= 0;
    const userScore = Math.floor((1 - (timeRemaining / targetTime) / 1000) * 100);

    useImperativeHandle(ref, () => {
        return{ 
            open() {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal"> 
            <h2>{timeExpired ? "You've lost" : undefined}</h2>
            {!timeExpired && <h2>Score: {userScore}</h2>}
            <p>The target time was <strong>{targetTime} seconds</strong> </p>
            {!timeExpired ? <p>You stopped the timer with <strong>{timeRemaining / 1000} Seconds left</strong></p> : <p>You couldn't stop the time.</p>}
            <form method="dialog" onSubmit={onReset} onClose={onReset}><button>Close</button></form>
        </dialog>
        ,document.getElementById("modal")
    )
})

export default ResultModal;