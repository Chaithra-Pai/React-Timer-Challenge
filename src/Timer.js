import { useState, useEffect } from "react";
export const Timer = (props) => {
  const START_DURATION = 10;
  const [start_minutes, setStartMinutes] = useState(1);
  const [start_seconds, setStartSeconds] = useState(0);

  const [currentMinutes, setMinutes] = useState(0);
  const [currentSeconds, setSeconds] = useState(0);

  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(start_seconds, 10) + 60 * parseInt(start_minutes, 10));
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsRunning(false);
  };

  const resetHandler = () => {
    setMinutes(1);
    setSeconds(0);
    setIsRunning(false);
    setDuration(START_DURATION);
  };

  const resumeHandler = () => {
    let newDuration = parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div>
      <input value={start_minutes} type="number" onChange={(e) => {setStartMinutes(e.target.value);}} disabled={isRunning} min={0} />
      <p>Minutes</p>
      <input value={start_seconds} type="number" disabled={isRunning} onChange={(e) => {setStartSeconds(e.target.value);}} min={0}/>
      <p>Seconds</p>
      <button id="start" onClick={startHandler}>START</button>
      <button id="stop" onClick={stopHandler}>STOP</button>
      <button id="resume" onClick={resumeHandler}>RESUME</button>
      <button id="reset" onClick={resetHandler}>RESET</button>

      <h1>{currentMinutes}:{currentSeconds}</h1>
    </div>
  );
};
