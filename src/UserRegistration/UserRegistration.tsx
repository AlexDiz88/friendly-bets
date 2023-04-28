import React, { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import style from './UserRegistration.module.css';
import Notification from '../Notification/Notification';

function UserRegistration(): ReactElement {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const doUserRegistration = async (): Promise<boolean> => {
    setShowNotification(false);
    if (!isValidEmail) {
      setShowNotification(true);
      console.log('******awdawdawdwdad******');

      setNotificationType('error');
      setNotificationMsg('Некорректный email');
      setEmail('');
      return false;
    }
    if (password === '' || password2 === '') {
      setShowNotification(true);
      setNotificationType('error');
      setNotificationMsg('Не указан пароль');
      setPassword('');
      setPassword2('');
      return false;
    }
    if (password !== password2) {
      setShowNotification(true);
      setNotificationType('error');
      setNotificationMsg('Пароли не совпадают');
      setPassword('');
      setPassword2('');
      return false;
    }
    try {
      const user = await Parse.User.signUp(username, password, {
        email,
      });
      user.setEmail(email);
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
      navigate('/', {
        state: {
          isShow: true,
          type: 'success',
          msg: 'Успешная регистрация!',
          duration: 5000,
        },
      });
      return true;
    } catch (error: any) {
      setShowNotification(true);
      setNotificationType('error');
      setNotificationMsg(`Ошибка регистрации: ${error}`);
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
      return false;
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Регистрация нового участника</div>
      <div>
        <input
          value={username}
          autoComplete="true"
          onChange={(event: any) => setUsername(event.target.value)}
          placeholder="Имя пользователя"
          type="username"
          className={style.inputField}
        />
      </div>
      <div>
        <input
          value={email}
          onChange={(event: any) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          className={style.inputField}
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(event: any) => setPassword(event.target.value)}
          placeholder="Пароль"
          type="password"
          className={style.inputField}
        />
      </div>
      <div>
        <input
          value={password2}
          onChange={(event: any) => setPassword2(event.target.value)}
          placeholder="Пароль (еще раз)"
          type="password"
          className={style.inputField}
        />
      </div>
      <div>
        <button
          type="button"
          className={style.registerBtn}
          onClick={() => doUserRegistration()}
        >
          Зарегистрироваться
        </button>
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

export default UserRegistration;
