import React, { useState } from 'react';
import Parse from 'parse';
import style from './Bets.module.css';
import Notification from '../Notification/Notification';

function Bets(): JSX.Element {
  const [tournament, setTournament] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');

  async function sendBet(): Promise<void> {
    try {
      const Bet = new Parse.Object('Bets');
      Bet.set('Tournament', tournament);
      Bet.set('homeTeam', homeTeam);
      Bet.set('awayTeam', awayTeam);
      await Bet.save();
      setTournament('');
      setHomeTeam('');
      setAwayTeam('');
      setShowNotification(true);
      setNotificationType('success');
      setNotificationMsg('Ставка успешно отправлена');
    } catch (error) {
      setTournament('');
      setHomeTeam('');
      setAwayTeam('');
      setShowNotification(true);
      setNotificationType('error');
      setNotificationMsg(
        'Ставки могут отправлять только зарегистрированные пользователи'
      );
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
        <Notification
          type={notificationType}
          message={notificationMsg}
          duration={5000}
        />
      )}
    </div>
  );
}

export default Bets;
