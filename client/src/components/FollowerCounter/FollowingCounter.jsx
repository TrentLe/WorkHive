import React, { useEffect, useState } from 'react';

const FollowingCounter = ({ following }) => {
  // Specify the target number to count up to

  const targetNumber = following;

  // Define the interval for the animation (in milliseconds)
  const animationInterval = 10;

  // Calculate the increment value based on the target number and animation interval
  const increment = targetNumber / (1000 / animationInterval);

  // Initialize the current count using React state
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    // Create a function to update the counter
    const updateCounter = () => {
      setCurrentCount((prevCount) => {
        const newCount = prevCount + increment;

        // Ensure the counter doesn't exceed the target number
        if (newCount >= targetNumber) {
          return targetNumber;
        }

        return newCount;
      });
    };

    // Start the counter animation
    const counterInterval = setInterval(updateCounter, animationInterval);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(counterInterval);
    };
  }, [targetNumber, increment]);

  return (
    <div>
      <h4>Following</h4>
      <p className="counter">{Math.round(currentCount)}</p>
    </div>
  );
};

export default FollowingCounter;
