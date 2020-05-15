import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Button, Modal } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";
import ReactionTypeNumberWorkoutDisplay from "../reaction_type/ReactionTypeNumberWorkoutDisplay";

const WorkoutPage: React.FC = () => {
  const { type, area, kind, time, repeat } = useContext(ReactionWorkoutContext);
  const { width, height } = useWindowSize();
  const [runTimeBasedReaction, setRunTimeBasedReaction] = useState<boolean>(
    false
  );
  const [randomValue, setRandomValue] = useState<string>("");
  const [randomValueChanged, setRandomValueChanged] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const initializeAreaPool = () => {
    switch (type) {
      case ReactionType.NUMBER:
        const min = parseInt(area[0]);
        const max = parseInt(area[1]);
        const range = max - min + 1;
        return Array(range)
          .fill(0)
          .map((v, i) => `${i + min}`);
      default:
        return [...area];
    }
  };

  const newRandomValue = () => {
    if (areaPool !== undefined && areaPool !== null && areaPool.length > 0) {
      return areaPool[Math.floor(Math.random() * areaPool.length)];
    }
    return "";
  };

  const generateRandomValue = () => {
    setRandomValueChanged(false);
    if (areaPool.length > 0) {
      Promise.resolve(setRandomValue("")).then(() =>
        setTimeout(() => setRandomValue(newRandomValue()), 200)
      );
    }
  };

  const [areaPool, setAreaPool] = useState<string[]>(initializeAreaPool());

  const DoneModal: React.FC = () => {
    return (
      <Modal
        show={done}
        size="sm"
        centered
        onHide={() => {
          setDone(false);
          setAreaPool(initializeAreaPool());
          setRandomValue("");
          setRunTimeBasedReaction(false);
        }}
      >
        <Modal.Header className="modal-head-fg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Done</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  };

  useEffect(() => {
    if (areaPool.length === 0) {
      if (kind === 1) {
        setTimeout(() => setDone(true), time * 1000);
      }
    }
  }, [areaPool, kind, time]);

  useEffect(() => {
    if (randomValue.length > 0) {
      setRandomValueChanged(true);
    }
  }, [randomValue]);

  useEffect(() => {
    if (!repeat && areaPool.indexOf(randomValue) >= 0) {
      const modAreaPool = areaPool.filter((v, i) => v !== randomValue);
      setAreaPool(modAreaPool);
    }
  }, [randomValue, areaPool, repeat]);

  useEffect(() => {
    if (runTimeBasedReaction && randomValueChanged) {
      setTimeout(generateRandomValue, time * 1000);
    }
  }, [runTimeBasedReaction, time, randomValueChanged]);

  return (
    <>
      <DoneModal />
      {type === ReactionType.NUMBER && (
        <ReactionTypeNumberWorkoutDisplay randomValue={randomValue} />
      )}
      <Container
        style={{
          width: width,
          height: (2 * height) / 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {kind === 1 && (
          <Button
            id="button-fg"
            className="button-big-circle-centered"
            onClick={() => {
              if(!runTimeBasedReaction) {
                generateRandomValue();
              }
              setRunTimeBasedReaction(!runTimeBasedReaction);
            }}
          >
            {runTimeBasedReaction ? "Stop" : "Start"}
          </Button>
        )}
        {kind === 0 && (
          <Button
            id="button-fg"
            className="button-big-circle-centered"
            onClick={() => {
              if (areaPool.length === 0) {
                setDone(true);
              } else {
                generateRandomValue();
              }
            }}
          >
            click
          </Button>
        )}
      </Container>
    </>
  );
};

export default WorkoutPage;
