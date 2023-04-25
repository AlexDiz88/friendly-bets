import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Parse from 'parse';
import Notification from '../Notification/Notification';
import style from './Home.module.css';

function Home(): JSX.Element {
  const location = useLocation();
  const [tournament, setTournament] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const {
    isShow = 'false',
    type = 'none',
    msg = '',
    duration = '1',
  } = location.state || {};
  useEffect(() => {
    setShowNotification(isShow);
  }, [isShow]);

  async function sendBet(): Promise<void> {
    try {
      const Bet = new Parse.Object('Bets');
      Bet.set('Tournament', tournament);
      Bet.set('homeTeam', homeTeam);
      Bet.set('awayTeam', awayTeam);
      await Bet.save();
      alert('Bet saved!');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Турнир:
        <input
          value={tournament}
          onChange={(event: any) => setTournament(event.target.value)}
          type="text"
          className={style.inputField}
        />
      </div>
      <div className={style.title}>
        Хозяева:
        <input
          value={homeTeam}
          onChange={(event: any) => setHomeTeam(event.target.value)}
          type="text"
          className={style.inputField}
        />
      </div>
      <div className={style.title}>
        Гости:
        <input
          value={awayTeam}
          onChange={(event: any) => setAwayTeam(event.target.value)}
          type="text"
          className={style.inputField}
        />
      </div>
      <button type="button" className={style.sendBtn} onClick={() => sendBet()}>
        Отправить ставку
      </button>
      {showNotification && (
        <Notification type={type} message={msg} duration={duration} />
      )}
    </div>
  );
}

export default Home;
