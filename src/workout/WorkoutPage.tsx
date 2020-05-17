import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Button, Modal } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";
import ReactionTypeNumberWorkoutDisplay from "../reaction_type/ReactionTypeNumberWorkoutDisplay";

const WorkoutPage: React.FC = () => {
  const { type, area, kind, time, repeat } = useContext(ReactionWorkoutContext);
  const { width, height } = useWindowSize();
  const [randomValue, setRandomValue] = useState<string>("");
  const [needNewRandomValue, setNeedNewRandomValue] = useState<boolean>(false);
  const [runTimeBasedReaction, setRunTimeBasedReaction] = useState<boolean>(
    false
  );
  const [done, setDone] = useState<boolean>(false);
  const [areaPool, setAreaPool] = useState<string[]>([]);

  /**
   * Effect to generate new random value or set done
   */
  useEffect(() => {
    if (needNewRandomValue && areaPool.length > 0) {
      setNeedNewRandomValue(false);
      Promise.resolve(setRandomValue("")).then(() =>
        setTimeout(
          () =>
            setRandomValue(
              areaPool[Math.floor(Math.random() * areaPool.length)]
            ),
          200
        )
      );
    } else if (needNewRandomValue && areaPool.length === 0) {
      setNeedNewRandomValue(false);
      setRunTimeBasedReaction(false);
      setDone(true);
    }
  }, [needNewRandomValue, areaPool]);

  /**
   * Effect to start sleep for given amount of time
   */
  useEffect(() => {
    if (randomValue !== "" && runTimeBasedReaction) {
      setTimeout(() => setNeedNewRandomValue(true), time * 1000);
    }
  }, [randomValue, time, runTimeBasedReaction]);

  /**
   * Effect to start random value generation for time based reaction
   */
  useEffect(() => {
    if (runTimeBasedReaction) {
      setNeedNewRandomValue(true);
    }
  }, [runTimeBasedReaction]);

  /**
   * Effect to clear random value when done and initialize area pool when done changes to false
   */
  useEffect(() => {
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
    if (done) {
      setRandomValue("");
    } else {
      setAreaPool(initializeAreaPool());
    }
  }, [done, type, area]);

  /**
   * Effect to update valid values when they are not allowed to be repeated
   */
  useEffect(() => {
    if (!repeat && areaPool.indexOf(randomValue) >= 0) {
      const modAreaPool = areaPool.filter((v, i) => v !== randomValue);
      setAreaPool(modAreaPool);
    }
  }, [randomValue, areaPool, repeat]);

  const DoneModal: React.FC = () => {
    return (
      <Modal
        show={done}
        size="sm"
        centered
        onHide={() => {
          setDone(false);
        }}
      >
        <Modal.Header className="modal-head-fg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Done</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  };

  return (
    <>
      <DoneModal />
      {(type === ReactionType.NUMBER || type === ReactionType.NAME) && (
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
            onClick={() => setNeedNewRandomValue(true)}
          >
            click
          </Button>
        )}
      </Container>
    </>
  );
};

export default WorkoutPage;
