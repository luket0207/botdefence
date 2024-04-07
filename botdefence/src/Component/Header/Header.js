import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faDroplet, faHillRockslide, faBolt, faFireFlameCurved, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

const Header = ({ playerHealth, playerMaxHealth, roundCount, roundType, nextRoundType, gameState }) => {
  // Define an object mapping each type to its corresponding icon
  const typeIcons = {
    basic: faCircleXmark,
    water: faDroplet,
    rock: faHillRockslide,
    electric: faBolt,
    fire: faFireFlameCurved
  };

  return (
    <div className='header'>
      <div className='header-item header-title'><h1>Bots</h1></div>
      {gameState !== 'Start' &&
        <>
          <div className='header-item header-type'>
            <h3>Bug Type</h3>
            <div className={`${roundType} header-icon`}>
              <FontAwesomeIcon icon={typeIcons[roundType]} size="2x" />
            </div>
          </div>
          <div className='header-item header-nexttype'>
            <h3>Next Bug Type</h3>
            <div className={`${nextRoundType} header-icon`}>
              <FontAwesomeIcon icon={typeIcons[nextRoundType]} size="2x" />
            </div>
          </div>
          <div className='header-item header-health'>
            <div className='health header-icon'>
              <FontAwesomeIcon icon={faHeartPulse} size="2x" />
            </div>
            <h3>{playerHealth} / {playerMaxHealth}</h3>
          </div>
          <div className='header-item header-round'><h3>Round</h3><p>{roundCount}</p></div>
        </>
      }
    </div>
  );
};

export default Header;
