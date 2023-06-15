import React from 'react';
import style from './Home.module.css';

function Home(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>HomePage</div>
    </div>
  );
}

export default Home;
