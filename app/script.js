import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [timerStarted, setTimerStarted] = useState(false);
  const [working, setWorking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setMinutes(Math.floor(seconds / 60));

    // if 20 minutes pass and need to rest
    if (timerStarted && working && seconds === 0) {
      setSeconds(20);
      setWorking(false);
      playBell();

      // if 20 seconds of resting ends
    } else if (timerStarted && !working && seconds === 0) {
      setSeconds(1200);
      setWorking(true);
      playBell();
    }
  }, [seconds]);

  const addLeadingZero = time => {
    if (time < 10) {
      return '0' + time
    }
    return time;
  }


  const startTimer = () => {
    setTimerStarted(true);
    setWorking(true);
    setSeconds(1200);
    const id = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    setIntervalId(id);
  }

  const stopTimer = () => {
    setTimerStarted(false);
    setWorking(false);
    setSeconds(0);
    clearInterval(intervalId);
  }

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  if (timerStarted) {
    return (
      <div>
        {working ? <img src="./images/work.png" /> : <img src="./images/rest.png" />}
        <div className="timer">
          {addLeadingZero(minutes) + ':' + addLeadingZero(seconds % 60)}
        </div>
        <button className="btn" onClick={stopTimer}>Stop</button>
        <button className="btn btn-close" onClick={window.close}>X</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
      <button className="btn" onClick={startTimer}>Start</button>
      <button className="btn btn-close" onClick={window.close}>X</button>
    </div>
  )

};

render(<App />, document.querySelector('#app'));