import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Notification from '../Notification/Notification';
import style from './Home.module.css';

function Home(): JSX.Element {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const {
    isShow = 'false',
    type = 'none',
    msg = '',
    duration = '1',
  } = location.state || {};

  React.useEffect(() => {
    setShowNotification(isShow);
  }, [isShow]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>HomePage</div>
      {showNotification && (
        <Notification type={type} message={msg} duration={duration} />
      )}
    </div>
  );
}

export default Home;
