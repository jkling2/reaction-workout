import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";
import TextWorkoutDisplay from "../reaction_type/TextWorkoutDisplay";
import ColorWorkoutDisplay from "../reaction_type/ColorWorkoutDisplay";
import DirectionWorkoutDisplay from "../reaction_type/DirectionWorkoutDisplay";

const WorkoutPage: React.FC = () => {
  const { type, area, time, repeat } = useContext(ReactionWorkoutContext);
  const [randomValue, setRandomValue] = useState<string>("");
  const [needNewRandomValue, setNeedNewRandomValue] = useState<boolean>(false);
  const [runTimeBasedReaction, setRunTimeBasedReaction] = useState<boolean>(
    false
  );
  const [done, setDone] = useState<boolean>(false);
  const [areaPool, setAreaPool] = useState<string[]>([]);
  const defaultBackground: string = "white";
  const [timer, setTimer] = useState(setTimeout(() => {}, 0));
  const [startTimer, setStartTimer] = useState<boolean>(false);

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

  useEffect(() => {
    if (randomValue === "") {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
  }, [randomValue]);

  /**
   * Effect to start sleep for given amount of time
   */
  useEffect(() => {
    if (startTimer && runTimeBasedReaction) {
      setTimer(
        setTimeout(() => {
          setNeedNewRandomValue(true);
        }, time * 1000)
      );
    }
  }, [startTimer, time, runTimeBasedReaction]);

  /**
   * Effect to start random value generation for time based reaction
   */
  useEffect(() => {
    if (runTimeBasedReaction) {
      setNeedNewRandomValue(true);
    }
  }, [runTimeBasedReaction]);

  /**
   * Effect to clear timer
   */
  useEffect(() => {
    if (!runTimeBasedReaction) {
      clearTimeout(timer);
      setStartTimer(false);
    }
  }, [runTimeBasedReaction, timer]);

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
        <TextWorkoutDisplay
          randomValue={randomValue}
          reactionButtonProps={{
            runTimeBasedReaction,
            setRunTimeBasedReaction,
            setNeedNewRandomValue,
          }}
        />
      )}
      {type === ReactionType.COLOR && (
        <ColorWorkoutDisplay
          randomValue={randomValue}
          defaultBackground={defaultBackground}
          reactionButtonProps={{
            runTimeBasedReaction,
            setRunTimeBasedReaction,
            setNeedNewRandomValue,
          }}
        />
      )}
      {type === ReactionType.DIRECTION && (
        <DirectionWorkoutDisplay
          areaPool={areaPool}
          randomValue={randomValue}
          reactionButtonProps={{
            runTimeBasedReaction,
            setRunTimeBasedReaction,
            setNeedNewRandomValue,
          }}
        />
      )}
    </>
  );
};

export default WorkoutPage;
