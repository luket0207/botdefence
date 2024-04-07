import React, { useState, useEffect } from 'react';
import botImg from '../../Assets/Images/bot.png'
import './Inventory.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const Inventory = ({ setGameState, setbotsArray, maxTowers, botsArray }) => {
  const [inventoryArray] = useState([
    {
      id: 1,
      name: 'Basic Fast',
      type: 'basic',
      shortBasicDamage: 1,
      normalBasicDamage: 0,
      longBasicDamage: 0,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 2,
      name: 'Basic Normal',
      type: 'basic',
      shortBasicDamage: 0,
      normalBasicDamage: 2,
      longBasicDamage: 0,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 3,
      name: 'Basic Slow',
      type: 'basic',
      shortBasicDamage: 0,
      normalBasicDamage: 0,
      longBasicDamage: 5,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 4,
      name: 'Water Fast',
      type: 'water',
      shortBasicDamage: 2,
      normalBasicDamage: 0,
      longBasicDamage: 0,
      shortWaterDamage: 1,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 5,
      name: 'Rock Fast',
      type: 'rock',
      shortBasicDamage: 2,
      normalBasicDamage: 0,
      longBasicDamage: 0,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 1,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 6,
      name: 'Electric Fast',
      type: 'electric',
      shortBasicDamage: 2,
      normalBasicDamage: 0,
      longBasicDamage: 0,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 1,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 0,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
    {
      id: 7,
      name: 'Fire Fast',
      type: 'fire',
      shortBasicDamage: 2,
      normalBasicDamage: 0,
      longBasicDamage: 0,
      shortWaterDamage: 0,
      normalWaterDamage: 0,
      longWaterDamage: 0,
      shortRockDamage: 0,
      normalRockDamage: 0,
      longRockDamage: 0,
      shortElectricDamage: 0,
      normalElectricDamage: 0,
      longElectricDamage: 0,
      shortFireDamage: 1,
      normalFireDamage: 0,
      longFireDamage: 0,
    },
  ]);

  const handleItemClick = (item) => {
    const isSelected = botsArray.some((bot) => bot.id === item.id);

    if (!isSelected) {
      if (botsArray.length < maxTowers) {
        setbotsArray([...botsArray, item]);
      }
    } else {
      const newbotsArray = botsArray.filter((bot) => bot.id !== item.id);
      setbotsArray(newbotsArray);
    }
  };

  return (
    <div className='inventory'>
      <div>
        <h2>Inventory</h2>
        <p>Select the robots you wish to battle in the next round.</p>
      </div>
      <div className='inventory-buttons'><Button onClick={() => setGameState('Track')} disabled={botsArray.length === 0} type={'big'}>Start Round</Button></div>
      <div className='inventory-itemgrid'>
        {inventoryArray.map((item, index) => (
          <div
            key={index}
            className={`inventory-item ${botsArray.some((bot) => bot.id === item.id) ? 'selected' : ''} ${item.type}`}
            onClick={() => handleItemClick(item)}
          >
            <div className='inventory-item-name'>
              <h3>{item.name}</h3>
            </div>
            <div className='inventory-item-image'><img src={botImg} /></div>
            <div className='inventory-item-tick'><FontAwesomeIcon icon={faCircleCheck} size="2x" /></div>
          </div>
        ))}
        </div>
      
    </div>
  );
};

export default Inventory;
