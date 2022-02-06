import React, {useEffect, useState} from 'react';

function Clock() {
  const [hours, setHours] = useState('--');
  const [minutes, setMinutes] = useState('--');
  const [seconds, setSeconds] = useState('--');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      setHours(today.getHours().toString())
      setMinutes(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes().toString());
      setSeconds(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds().toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <h2 className='time'>
      {hours}:{minutes}:{seconds}
    </h2>
  );
}

export default Clock;