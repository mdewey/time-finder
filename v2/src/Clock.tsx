import React, {useEffect, useState} from 'react';

function Clock() {
  const [time, setTime] = useState('....');
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <h2 className='time'>
      {time}
    </h2>
  );
}

export default Clock;