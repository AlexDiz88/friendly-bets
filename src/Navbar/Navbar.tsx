import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const btnNavHome = (): void => navigate('/');
  const btnNavLoginPage = (): void => navigate('/login');
  const btnNavBets = (): void => navigate('/bets');
  const btnNavBetInput = (): void => navigate('/bet-input');
  return (
    <div className={style.wrapper}>
      <button type="button" onClick={btnNavHome}>
        Home
      </button>
      <button type="button" onClick={btnNavBets}>
        Bets
      </button>
      <button type="button" onClick={btnNavBetInput}>
        Bet Input
      </button>
      <button type="button" onClick={btnNavLoginPage}>
        Login
      </button>
    </div>
  );
}

export default Navbar;
