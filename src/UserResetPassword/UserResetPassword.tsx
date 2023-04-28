import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import style from './UserResetPassword.module.css';
import Notification from '../Notification/Notification';

function UserResetPassword(): ReactElement {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');

  const [email, setEmail] = useState('');

  const doRequestPasswordReset = async (): Promise<boolean> => {
    const emailValue: string = email;
    try {
      await Parse.User.requestPasswordReset(emailValue);
      setShowNotification(true);
      setNotificationType('default');
      setNotificationMsg(
        `Пожалуйста, проверьте ${email}, чтобы продолжить сброс пароля`
      );
      setTimeout(() => navigate('/login'), 5000);
      return true;
    } catch (error: any) {
      setShowNotification(true);
      setNotificationType('error');
      setNotificationMsg(`Ошибка: ${error}`);
      return false;
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <div>
          Для сброса пароля, введите адрес электронной почты вашей учетной записи:
        </div>
        <div>
          <input
            className={style.inputField}
            value={email}
            placeholder="Введите ваш E-mail"
            onChange={(event: any) => setEmail(event.target.value)}
            type="email"
          />
        </div>
        <div>
          <button
            type="button"
            className={style.registerBtn}
            onClick={() => doRequestPasswordReset()}
          >
            Запросить сброс пароля
          </button>
        </div>
        {showNotification && (
          <Notification
            type={notificationType}
            message={notificationMsg}
            duration={5000}
          />
        )}
      </div>
    </div>
  );
}

export default UserResetPassword;
