import React, { useState } from 'react';
import Parse from 'parse';
import UserLogin from '../UserLogIn/UserLogIn';

function LoginPage(): JSX.Element {
  // eslint-disable-next-line no-console
  //   console.log(Parse.User.current());
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  const getCurrentUser = async (): Promise<Parse.User | null> => {
    setCurrentUser(await Parse.User.currentAsync());
    return currentUser;
  };
  getCurrentUser();

  return (
    <div>
      <UserLogin />
    </div>
  );
}

export default LoginPage;
