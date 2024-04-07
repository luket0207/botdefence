import React, { useState, useEffect, useRef } from 'react';
import './Track.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';


const Track = ({
  basicBugs,
  waterBugs,
  rockBugs,
  electricBugs,
  fireBugs,
  health,
  speed,
  shortBasicDamage,
  normalBasicDamage,
  longBasicDamage,
  shortWaterDamage,
  normalWaterDamage,
  longWaterDamage,
  shortRockDamage,
  normalRockDamage,
  longRockDamage,
  shortElectricDamage,
  normalElectricDamage,
  longElectricDamage,
  shortFireDamage,
  normalFireDamage,
  longFireDamage,
  setGameState,
  setRoundCount,
  playerHealth,
  setPlayerHealth,
}) => {
  const shortTick = 100;
  const longTick = 200;
  const [bugs, setBugs] = useState([]);
  const [tick, setTick] = useState(0);
  const [tickInterval, setTickInterval] = useState(longTick);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [stagger, setStagger] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);


  useEffect(() => {
    initializeBugs();
    handleRoundStart();
    // Clean up on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Perform actions on each tick only if the round has started and not paused
    if (tick > 0 && !paused) {
      handleTickActions();
    }
  }, [tick, paused]);

  const initializeBugs = () => {
    const initialBugs = [];
    for (let i = 0; i < basicBugs; i++) {
      initialBugs.push({
        name: `basicBug${i + 1}`,
        health,
        distance: 50,
        dead: false,
        complete: false,
        type: 'basic',
      });
    }
    for (let i = 0; i < waterBugs; i++) {
      initialBugs.push({
        name: `waterBug${i + 1}`,
        health,
        distance: 50,
        dead: false,
        complete: false,
        type: 'water',
      });
    }
    for (let i = 0; i < rockBugs; i++) {
      initialBugs.push({
        name: `rockBug${i + 1}`,
        health,
        distance: 50,
        dead: false,
        complete: false,
        type: 'rock',
      });
    }
    for (let i = 0; i < electricBugs; i++) {
      initialBugs.push({
        name: `electricBug${i + 1}`,
        health,
        distance: 50,
        dead: false,
        complete: false,
        type: 'electric',
      });
    }
    for (let i = 0; i < fireBugs; i++) {
      initialBugs.push({
        name: `fireBug${i + 1}`,
        health,
        distance: 50,
        dead: false,
        complete: false,
        type: 'fire',
      });
    }
    setBugs(initialBugs);
  };
  
  const handleTickActions = () => {
    // Find the first eligible bug
    const targetBugIndex = bugs.findIndex(bug => !bug.dead && !bug.complete);
  
    // If no eligible bug is found, return early
    if (targetBugIndex === -1) return;
  
    // Update stagger state every tick
    if ((tick + 1) % speed === 0) {
      setStagger(prevStagger => prevStagger + 0.5);
    }
  
    // Handle bug movements and damage
    const updatedBugs = bugs.map((bug, index) => {
      // Reduce distance based on speed
      if ((tick + 1) % speed === 0 && index <= stagger) {
        bug.distance -= 1;
      }
  
      // Skip if bug is not the target bug
      if (index !== targetBugIndex) return bug;
      
      //if bug is on the track
      if (bug.distance < 50) {

        // Inflict damage based on tick count
        if ((tick + 1) % 3 === 0) {
          if (bug.type === "water") {
            bug.health -= ((longBasicDamage / 2) + longWaterDamage);
          } else if (bug.type === "rock") {
            bug.health -= ((longBasicDamage / 2) + longRockDamage);
          } else if (bug.type === "electric") {
            bug.health -= ((longBasicDamage / 2) + longElectricDamage);
          } else if (bug.type === "fire") {
            bug.health -= ((longBasicDamage / 2) + longFireDamage);
          } else {
            bug.health -= longBasicDamage;
          }
        }
        
        if ((tick + 1) % 2 === 0) {
          if (bug.type === "water") {
            bug.health -= ((normalBasicDamage / 2) + normalWaterDamage);
          } else if (bug.type === "rock") {
            bug.health -= ((normalBasicDamage / 2) + normalRockDamage);
          } else if (bug.type === "electric") {
            bug.health -= ((normalBasicDamage / 2) + normalElectricDamage);
          } else if (bug.type === "fire") {
            bug.health -= ((normalBasicDamage / 2) + normalFireDamage);
          } else {
            bug.health -= normalBasicDamage;
          }
        }
    
        if (bug.type === "water") {
          bug.health -= ((shortBasicDamage / 2) + shortWaterDamage);
        } else if (bug.type === "rock") {
          bug.health -= ((shortBasicDamage / 2) + shortRockDamage);
        } else if (bug.type === "electric") {
          bug.health -= ((shortBasicDamage / 2) + shortElectricDamage);
        } else if (bug.type === "fire") {
          bug.health -= ((shortBasicDamage / 2) + shortFireDamage);
        } else {
          bug.health -= shortBasicDamage;
        }
      }
  
      // Check if bug is dead
      if (bug.health <= 0) {
        bug.dead = true;
      }

      if (bug.distance <= 0 && !bug.complete) {
        bug.complete = true;
        setPlayerHealth(prevPlayerHealth => prevPlayerHealth - 1);
      }
 
      return bug;
    });
  
    setBugs(updatedBugs);
  
    // Check if all bugs are dead or complete
    if (updatedBugs.every(bug => bug.dead || bug.complete)) {
      handleRoundComplete();
    }
  };
  

  const handleRoundStart = () => {
    // Only start the round if it hasn't started yet
    if (tick === 0) {
      setRoundStarted(true);
      setTick(1); // Moved tick initialization here
      console.log("round started");
    }
  };

  useEffect(() => {
    console.log(playerHealth);
    // Game over check
    if (playerHealth <= 0) {
      handleGameOver();
    }
  }, [playerHealth]);
  
  useEffect(() => {
    // Clear any existing interval before starting a new one
    clearInterval(intervalRef.current);
    
    // Start a new interval
    if (roundStarted) {
      intervalRef.current = setInterval(() => {
        setTick(prevTick => prevTick + 1);
      }, tickInterval); 
    }
  
    // Clean up when component unmounts or when tickInterval changes
    return () => clearInterval(intervalRef.current);
  }, [tickInterval, roundStarted]);

  const handleRoundComplete = () => {
    clearInterval(intervalRef.current);

    setTimeout(() => {
      setRoundCount(prevRoundCount => prevRoundCount + 1);
      setGameState("Inventory");
    }, 1000);
  }
  
  const handleReset = () => {
    clearInterval(intervalRef.current);
    initializeBugs();
    setTick(0);
    setStagger(0);
    setRoundStarted(false);
  };

  const handleGameOver = () => {
    clearInterval(intervalRef.current);

    const updatedBugs = bugs.map(bug => ({
      ...bug,
      dead: true
    }));
    setBugs(updatedBugs);

    setTimeout(() => {
      handleReset();
      setGameState("Dead")
    }, (longTick * 5));
  }

  const speedControl = () => {
    const newTickInterval = tickInterval === longTick ? shortTick : longTick;
    setTickInterval(newTickInterval);
  };

  const handlePause = () => {
    setPaused(prevPaused => !prevPaused);
  };
  

  return (
    <div className="track">
      <div className="track-door entrance"><p>Entrance</p></div>
      <div className="track-door exit"><p>Exit</p></div>
      <div className="bug-container">
        {bugs.map(bug => (
          <div
            key={bug.name}
            className={`bug ${bug.dead ? 'dead' : ''} ${bug.complete ? 'complete' : ''} ${bug.type} ${bug.distance === 50 ? 'hidden' : ''}`}
            style={{ left: `${(bug.distance * 30) - 30}px`, transitionDuration: `${speed / 4}s`, }}
          >
            <div className='bug-health'>{bug.health <= 0 ? <div className='bug-health-dead'>X</div> : bug.health}</div>
            <div className="bug-image"><FontAwesomeIcon icon={faBug} size="3x" /></div>
          </div>
        ))}
      </div>
      <div className="controls">
        <Button onClick={speedControl} type={'small'}>{tickInterval === longTick ? 'Speed Up' : 'Slow Down'}</Button>
        <Button onClick={handlePause} type={'small'}>{paused ? 'Resume' : 'Pause'}</Button>
      </div>
    </div>
  );
};

export default Track;
