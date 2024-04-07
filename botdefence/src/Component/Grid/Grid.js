import React, { useState, useEffect } from 'react';
import botImg from '../../Assets/Images/bot.png'
import './Grid.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faHillRockslide, faBolt, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';

const Grid = ({ botsArray, gameState }) => {
  const [towers, setTowers] = useState(botsArray);
  const typeIcons = {
    water: faDroplet,
    rock: faHillRockslide,
    electric: faBolt,
    fire: faFireFlameCurved
  };

  // Update the towers state when botsArray prop changes
  useEffect(() => {
    setTowers(botsArray);
  }, [botsArray]);

  return (
      <div className={`grid ${gameState === "Track" ? "active" : ""}`}>
        {towers.map((bot, index) => (
          <div key={index} className={`grid-bot ${bot.type}`}>
            <img src={botImg} />
            <div className={`grid-bot-bg ${bot.type}`}>
              <FontAwesomeIcon icon={typeIcons[bot.type]} size="4x" />
            </div>
          </div>
        ))}
      </div>
  );
};

export default Grid;
