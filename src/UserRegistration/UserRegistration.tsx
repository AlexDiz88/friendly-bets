import React, { useState, ReactElement } from 'react';
import Parse from 'parse';
import style from './UserRegistration.module.css';

function UserRegistration(): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doUserRegistration = async (): Promise<boolean> => {
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      const createdUser: Parse.User = await Parse.User.signUp(
        usernameValue,
        passwordValue,
        ''
      );
      alert(`Success! User ${createdUser.getUsername()} was successfully created!`);
      return true;
    } catch (error: any) {
      alert(`Error! ${error}`);
      setUsername('');
      setPassword('');
      return false;
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Регистрация нового участника</div>
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
          onClick={() => doUserRegistration()}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default UserRegistration;
