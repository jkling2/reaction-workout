import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Button } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";

const WorkoutPage: React.FC = () => {
  const {
    mode,
    area,
    reaction,
    time,
    repeat,
    setMode,
    setArea,
    setReaction,
    setTime,
    setRepeat,
  } = useContext(ReactionWorkoutContext);

  const { width, height } = useWindowSize();

  useEffect(() => {
    console.log(`width= ${width}`)
    console.log(`height= ${height}`)
  }, [width, height])

  const [showStartButton, setShowStartButton] = useState(true);
  const min = parseInt(area[0]);
  const max = parseInt(area[1]) + 1;
  const range = max - min;
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * range) + min);
  const [randomNumberChanged, setRandomNumberChanged] = useState(true);
  
  const generateRandomNumber = () => {
      const rN = Math.floor(Math.random() * range) + min;
      setRandomNumber(NaN);
      setTimeout(() => setRandomNumber(rN), 200);
      setRandomNumberChanged(true);
    };

  useEffect(() => {
    if (reaction === 1 && !showStartButton && randomNumberChanged) {
        setRandomNumberChanged(false);
        setTimeout(generateRandomNumber, time*1000);
    }
  }, [showStartButton, time, area, reaction, randomNumberChanged])

  return (
      <Container style={{ width: width, height: height }}>
      <div style={{position: "relative", left: "47%", fontSize: "5rem", width: "min-content"}}>
          {isNaN(randomNumber) ? "..." : randomNumber}
          </div>
          {reaction === 1 && <Button
            id="button-fg"
            className="button-big-circle-centered"
            onClick={() => {
                setShowStartButton(!showStartButton);
            }}
          >
            {showStartButton ? "Start" : "Stop"}
          </Button>}
        {reaction === 0 && (
          <Button
            id="button-fg"
            className="button-big-circle-centered"
            onClick={() => generateRandomNumber()}
          >
            click
          </Button>
        )}
      </Container>
  );
};

export default WorkoutPage;
