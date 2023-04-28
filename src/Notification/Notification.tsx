import React, { useState, useEffect } from 'react';
import style from './Notification.module.css';

interface Props {
  type: string;
  message: string;
  duration: number;
}

// eslint-disable-next-line object-curly-newline
function Notification({ type, message, duration }: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), duration || 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${style.notification} ${style[type] || style.default} ${
        isVisible ? style.show : ''
      }`}
    >
      {message}
    </div>
  );
}

export default Notification;
