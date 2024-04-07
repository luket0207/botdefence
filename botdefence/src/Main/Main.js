import React, { useState, useEffect } from 'react';
import './Main.scss';
import Grid from '../Component/Grid/Grid';
import Track from '../Component/Track/Track';
import Inventory from '../Component/Inventory/Inventory';
import roundData from '../Data/startingRounds.json';
import Button from '../Component/Button/Button';
import Header from '../Component/Header/Header';

const Main = () => {
  const [gameState, setGameState] = useState("Start");
  const [roundCount, setRoundCount] = useState(0);
  const [roundType, setRoundType] = useState("basic");
  const [nextRoundType, setNextRoundType] = useState();
  const [playerHealth, setPlayerHealth] = useState(10);
  const [playerMaxHealth, setPlayerMaxHealth] = useState(10);
  const [maxBots, setMaxBots] = useState(3);
  const [botsArray, setbotsArray] = useState([]);

  const [shortBasicDamage, setShortBasicDamage] = useState(0);
  const [normalBasicDamage, setNormalBasicDamage] = useState(0);
  const [longBasicDamage, setLongBasicDamage] = useState(0);
  const [shortWaterDamage, setShortWaterDamage] = useState(0);
  const [normalWaterDamage, setNormalWaterDamage] = useState(0);
  const [longWaterDamage, setLongWaterDamage] = useState(0);
  const [shortRockDamage, setShortRockDamage] = useState(0);
  const [normalRockDamage, setNormalRockDamage] = useState(0);
  const [longRockDamage, setLongRockDamage] = useState(0);
  const [shortElectricDamage, setShortElectricDamage] = useState(0);
  const [normalElectricDamage, setNormalElectricDamage] = useState(0);
  const [longElectricDamage, setLongElectricDamage] = useState(0);
  const [shortFireDamage, setShortFireDamage] = useState(0);
  const [normalFireDamage, setNormalFireDamage] = useState(0);
  const [longFireDamage, setLongFireDamage] = useState(0);

  useEffect(() => {
    // Calculate total damage for each type
    const calculateTotalDamage = () => {
      let shortBasic = 0,
        normalBasic = 0,
        longBasic = 0,
        shortWater = 0,
        normalWater = 0,
        longWater = 0,
        shortRock = 0,
        normalRock = 0,
        longRock = 0,
        shortElectric = 0,
        normalElectric = 0,
        longElectric = 0,
        shortFire = 0,
        normalFire = 0,
        longFire = 0;

      // Iterate through botsArray to calculate total damage for each type
      botsArray.forEach((tower) => {
        shortBasic += tower.shortBasicDamage || 0;
        normalBasic += tower.normalBasicDamage || 0;
        longBasic += tower.longBasicDamage || 0;
        shortWater += tower.shortWaterDamage || 0;
        normalWater += tower.normalWaterDamage || 0;
        longWater += tower.longWaterDamage || 0;
        shortRock += tower.shortRockDamage || 0;
        normalRock += tower.normalRockDamage || 0;
        longRock += tower.longRockDamage || 0;
        shortElectric += tower.shortElectricDamage || 0;
        normalElectric += tower.normalElectricDamage || 0;
        longElectric += tower.longElectricDamage || 0;
        shortFire += tower.shortFireDamage || 0;
        normalFire += tower.normalFireDamage || 0;
        longFire += tower.longFireDamage || 0;
      });

      // Update state variables with calculated values
      setShortBasicDamage(shortBasic);
      setNormalBasicDamage(normalBasic);
      setLongBasicDamage(longBasic);
      setShortWaterDamage(shortWater);
      setNormalWaterDamage(normalWater);
      setLongWaterDamage(longWater);
      setShortRockDamage(shortRock);
      setNormalRockDamage(normalRock);
      setLongRockDamage(longRock);
      setShortElectricDamage(shortElectric);
      setNormalElectricDamage(normalElectric);
      setLongElectricDamage(longElectric);
      setShortFireDamage(shortFire);
      setNormalFireDamage(normalFire);
      setLongFireDamage(longFire);
    };

    // Calculate total damage whenever botsArray or its items change
    calculateTotalDamage();
  }, [botsArray]);

  // Function to get the round data based on roundCount
  const getRoundData = () => {
    const roundIndex = roundCount - 1; // Adjust roundCount to match array index
    if (roundIndex >= 0 && roundIndex < roundData.length) {
      return roundData[roundIndex];
    } else {
      // Return default values if roundCount is out of range
      return {
        "Round": roundCount,
        "Basic Bugs": 5,
        "Type Bugs Min": 0,
        "Type Bugs Max": 0,
        "Health": playerHealth,
      };
    }
  };

  // Define the types
const types = ['water', 'rock', 'electric', 'fire'];

const generateRandomType = () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * types.length);
  } while (types[randomIndex] === nextRoundType);
  return types[randomIndex];
};


useEffect(() => {
  if (roundCount > 1 && roundCount % 5 === 1) {
    setRoundType(nextRoundType);
    setNextRoundType(generateRandomType());
  }  
}, [roundCount]);

  const renderTrackComponent = () => {
    const round = getRoundData();
    return (
      <Track
        basicBugs={round['Basic Bugs']}
        waterBugs={roundType === 'water' ? getRandomInt(round['Type Bugs Min'], round['Type Bugs Max']) : 0}
        rockBugs={roundType === 'rock' ? getRandomInt(round['Type Bugs Min'], round['Type Bugs Max']) : 0}
        electricBugs={roundType === 'electric' ? getRandomInt(round['Type Bugs Min'], round['Type Bugs Max']) : 0}
        fireBugs={roundType === 'fire' ? getRandomInt(round['Type Bugs Min'], round['Type Bugs Max']) : 0}
        health={round['Health']}
        speed={round['Speed']}
        shortBasicDamage={shortBasicDamage}
        normalBasicDamage={normalBasicDamage}
        longBasicDamage={longBasicDamage}
        shortWaterDamage={shortWaterDamage}
        normalWaterDamage={normalWaterDamage}
        longWaterDamage={longWaterDamage}
        shortRockDamage={shortRockDamage}
        normalRockDamage={normalRockDamage}
        longRockDamage={longRockDamage}
        shortElectricDamage={shortElectricDamage}
        normalElectricDamage={normalElectricDamage}
        longElectricDamage={longElectricDamage}
        shortFireDamage={shortFireDamage}
        normalFireDamage={normalFireDamage}
        longFireDamage={longFireDamage}        
        setRoundCount={setRoundCount}
        setGameState={setGameState}
        playerHealth={playerHealth}
        setPlayerHealth={setPlayerHealth}
      />

    );
  };

  // Function to generate a random integer in the specified range
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleStartGame = () => {
    setRoundCount(1);
    setNextRoundType(generateRandomType());
    setGameState("Inventory");
  }

  return (
    <div className='game'>
      <div className='game-container'>
        <Header playerHealth={playerHealth} playerMaxHealth={playerMaxHealth} roundCount={roundCount} roundType={roundType} nextRoundType={nextRoundType} gameState={gameState} />
        <Grid botsArray={botsArray} gameState={gameState} />
          {gameState === "Start" && <div className='start'><Button onClick={handleStartGame} type={'huge'}>Start Game</Button></div>}
          {gameState === "Track" && renderTrackComponent()}
          {gameState === "Inventory" && <Inventory setGameState={setGameState} botsArray={botsArray} setbotsArray={setbotsArray} maxTowers={3} />}
          {gameState === "Dead" && <p>Game Over</p>}
      </div>
    </div>
  );
}

export default Main;
