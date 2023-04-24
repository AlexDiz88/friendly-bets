import React, { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import style from './UserLogIn.module.css';

function UserLogin(): ReactElement {
  const navigate = useNavigate();
  const toRegistrationPage = (event: any): void => {
    event.preventDefault();
    navigate('/sign-up');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  const getCurrentUser = async (): Promise<Parse.User | null> => {
    setCurrentUser(await Parse.User.currentAsync());
    return currentUser;
  };

  const doUserLogIn = async (): Promise<boolean> => {
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      const loggedInUser: Parse.User = await Parse.User.logIn(
        usernameValue,
        passwordValue
      );
      alert(
        `Success! User ${loggedInUser.get('username')} has successfully signed in!`
      );
      console.log(loggedInUser === (await Parse.User.currentAsync()));
      setUsername('');
      setPassword('');
      getCurrentUser();
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      setUsername('');
      setPassword('');
      return false;
    }
  };

  const doUserLogOut = async (): Promise<boolean> => {
    try {
      await Parse.User.logOut();
      if ((await Parse.User.currentAsync()) === null) {
        alert('Success! No user is logged in anymore!');
      }
      getCurrentUser();
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      setUsername('');
      setPassword('');
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
          <div>
            <button
              type="button"
              className={style.registerBtn}
              onClick={() => doUserLogIn()}
            >
              Войти
            </button>
            <p className={style.hint}>
              Нет аккаунта?{' '}
              <a className="form__link" href="#" onClick={toRegistrationPage}>
                Зарегистрируйся
              </a>
            </p>
          </div>
        </div>
      )}
      {currentUser !== null && (
        <div className={style.wrapper}>
          <div className={style.title}>
            {`Hello ${currentUser.get('username')}!`}
          </div>
          <div>
            <button
              type="button"
              className={style.registerBtn}
              onClick={() => doUserLogOut()}
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
