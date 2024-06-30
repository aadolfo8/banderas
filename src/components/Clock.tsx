import moment from 'moment-timezone';
import { FC, useEffect, useState } from 'react';
interface Props {
  timezone: string;
}
const Clock: FC<Props> = ({ timezone }) => {

    const [time, setTime] = useState(moment().utcOffset(timezone).format('HH:mm:ss'));
  useEffect(() => {
    const updateTime = () => {
      setTime(moment().utcOffset(timezone).format('HH:mm:ss'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      <p>Current time: {time}</p>
      <div id={`timezone${timezone}`} style={{ width: '200px', height: '200px' }}></div>
    </div>
  );
};

export default Clock;
