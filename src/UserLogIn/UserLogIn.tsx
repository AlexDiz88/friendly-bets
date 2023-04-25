import React, { useState, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import style from './UserLogIn.module.css';
import Notification from '../Notification/Notification';

function UserLogin(): ReactElement {
  const navigate = useNavigate();
  const toRegistrationPage = (event: any): void => {
    event.preventDefault();
    navigate('/sign-up');
  };
  const toPasswordReset = (event: any): void => {
    event.preventDefault();
    navigate('/password-reset');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');

  const getCurrentUser = async (): Promise<Parse.User | null> => {
    const user: Parse.User | null = await Parse.User.currentAsync();
    setCurrentUser(user);
    return currentUser;
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentUser]);

  const doUserLogIn = async (): Promise<boolean> => {
    setShowNotification(false);
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      await Parse.User.logIn(usernameValue, passwordValue);
      setNotificationType('success');
      setNotificationMsg('Вы успешно вошли в свой аккаунт');
      setShowNotification(true);
      setUsername('');
      setPassword('');
      getCurrentUser();
      return true;
    } catch (error: any) {
      setNotificationType('error');
      setNotificationMsg(`Ошибка: ${error}`);
      setShowNotification(true);
      setUsername('');
      setPassword('');
      return false;
    }
  };

  const doUserLogOut = async (): Promise<boolean> => {
    try {
      await Parse.User.logOut();
      const user: Parse.User | null = await Parse.User.currentAsync();
      if (user === null) {
        setNotificationType('default');
        setNotificationMsg('Вы вышли из системы');
        setShowNotification(true);
      }
      getCurrentUser();
      return true;
    } catch (error: any) {
      setNotificationType('error');
      setNotificationMsg(`Ошибка: ${error.message}`);
      setShowNotification(true);
      return false;
    }
  };

  return (
    <div>
      {currentUser === null && (
        <div className={style.wrapper}>
          <div className={style.title}>Вход в личный кабинет</div>
          <div>
            <input
              value={username}
              onChange={(event: any) => setUsername(event.target.value)}
              placeholder="Имя пользователя"
              type="username"
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
          <div className={style.hint}>
            Забыл пароль?{' '}
            <a href="#" onClick={toPasswordReset}>
              Восстановить
            </a>
          </div>
          <div>
            <button
              type="button"
              className={style.loginBtn}
              onClick={() => doUserLogIn()}
            >
              Войти
            </button>
            {showNotification && (
              <Notification
                type={notificationType}
                message={notificationMsg}
                duration={5000}
              />
            )}
            <p className={style.hint}>
              Нет аккаунта?{' '}
              <a href="#" onClick={toRegistrationPage}>
                Зарегистрируйся
              </a>
            </p>
          </div>
        </div>
      )}
      {currentUser !== null && (
        <div className={style.wrapper}>
          <div className={style.title}>Личный кабинет</div>
          <div className={style.info}>
            <div>{`Имя: ${currentUser.get('username')}`}</div>
            <div>{`E-mail: ${currentUser.get('email')}`}</div>
          </div>
          <div>
            <button
              type="button"
              className={style.logoutBtn}
              onClick={() => doUserLogOut()}
            >
              Выйти
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
      )}
    </div>
  );
}

export default UserLogin;
