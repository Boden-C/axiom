import React, { useState, useEffect } from 'react';

const HealthBar = () => {
  const [health, setHealth] = useState(10.0); // Initial health value
  const maxHealth = 10.0;

  // Function to handle damage
  const damage = () => {
    setHealth(Math.max(health - Math.random(),0));
  };

  // Function to handle healing
  const heal = () => {
    setHealth();
  };

  const regen = () => {
    console.log(health)
    let newHealth = health + ((-1.0)/10.0*health + maxHealth/10.0)
    setHealth(Math.min(newHealth,maxHealth));
  }

  // Update health continuously in the background
  useEffect(() => {
    const interval = setInterval(() => {
      regen();
    }, 1000); // Update health every second
    return () => clearInterval(interval);
  }, []);

  // useEffect to trigger whenever health updates
  useEffect(() => {
  }, [health]);

  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div>
      <h2>Health: {health.toFixed(1)}/{maxHealth.toFixed(1)}</h2>
      <div style={{ backgroundColor: 'gray', width: '500px', height: '20px', border: '1px solid black', borderRadius: '5px' }}>
        <div style={{ backgroundColor: 'green', width: `${healthPercentage}%`, height: '100%', borderRadius: '5px' }}></div>
      </div>
      <button onClick={damage}>Damage</button>
      <button onClick={heal}>Heal</button>
    </div>
  );
};

export default HealthBar;
