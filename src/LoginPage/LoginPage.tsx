import React, { useState } from 'react';
import Parse from 'parse';
// import UserRegistration from '../UserRegistration/UserRegistration';
import UserLogin from '../UserLogIn/UserLogIn';

function LoginPage(): JSX.Element {
  console.log(Parse.User.current());
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  const getCurrentUser = async (): Promise<Parse.User | null> => {
    setCurrentUser(await Parse.User.currentAsync());
    return currentUser;
  };
  getCurrentUser();

  return (
    <div>
      {/* <UserRegistration /> */}
      <UserLogin />
    </div>
  );
}

export default LoginPage;
