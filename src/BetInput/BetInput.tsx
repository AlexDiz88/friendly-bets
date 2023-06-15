import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import style from './BetInput.module.css';
import friendOptions from '../teams/EPL2324';

function BetInput(): JSX.Element {
  //   const teamsLogo = Object.values(teams2324.bundesliga).map((team) => (
  //     <img key={team.key} src={team.logo} alt={team.fullTeamNameEN} />
  //   ));

  return (
    <div className={style.wrapper}>
      {/* <div>{teamsLogo}</div> */}
      <Dropdown
        placeholder="Select Team"
        fluid
        selection
        scrolling={false}
        options={friendOptions}
        className={style.customDropdown}
      />
    </div>
  );
}

export default BetInput;
