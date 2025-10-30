import { useEffect, useRef, useState } from "react";
import { TimerDisplay } from "./timer-display";
import { TimerControls } from "./timerControls";

export const Timer = () => {
  const timerRef = useRef(null);
  const [time, setTime] = useState(() => {
    return Number(localStorage.getItem('time' || 0));
  });
  const [isRunning, setIsrRunning] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      //Clear interval to stop the timer
      clearInterval(timerRef.current)
      timerRef.current = null;
    } else {
      // Start timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000)
    }

    setIsrRunning(!isRunning);
  }

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsrRunning(false);
    setTime(0);
    timerRef.current = null;
    localStorage.removeItem('time');
  }

  useEffect(()=> {
    localStorage.setItem('time', time);
  }, [time]);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
        <TimerDisplay time={time} />
        <TimerControls toggleTimer={toggleTimer} isRunning={isRunning} resetTimer={resetTimer} />
      </div>
    </>
  )
}