import React from "react";

export const Timer = (props) => {
    const {timerTime} = props;
    let seconds = Math.floor(timerTime / 1000) % 60
    let minutes = Math.floor(timerTime / 60000) % 60
    let hours = Math.floor(timerTime / 3600000)
    return (
        <div className="timer-time">
            {hours >=1 && hours + 'h : '}{minutes >=1 && minutes + 'm : '}{seconds >= 0 && seconds + 's'}
        </div>
    )
}
