import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";
import TextWorkoutDisplay from "../reaction_type/TextWorkoutDisplay";
import ColorWorkoutDisplay from "../reaction_type/ColorWorkoutDisplay";
import DirectionWorkoutDisplay from "../reaction_type/DirectionWorkoutDisplay";

const WorkoutPage: React.FC = () => {
  const { type, area, time, repeat } = useContext(ReactionWorkoutContext);
  const [randomValueIdx, setRandomValueIdx] = useState<number>(-1);
  const [randomValue, setRandomValue] = useState<string>("");
  const [needNewRandomValue, setNeedNewRandomValue] = useState<boolean>(false);
  const [poolUpdated, setPoolUpdated] = useState<boolean>(true);
  const [runTimeBasedReaction, setRunTimeBasedReaction] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [areaPool, setAreaPool] = useState<string[]>([]);
  const defaultBackground: string = "white";
  const [timer, setTimer] = useState(setTimeout(() => {}, 0));
  const [startTimer, setStartTimer] = useState<boolean>(false);

  /**
   * Effect to generate new random value or set done
   */
  useEffect(() => {
    const unsetRV = () => {
      setRandomValueIdx(-1);
      setRandomValue("");
    };
    if (needNewRandomValue && areaPool.length > 0) {
      setNeedNewRandomValue(false);
      Promise.resolve(unsetRV()).then(() =>
        setTimeout(
          () => {
            const rvIdx = Math.floor(Math.random() * areaPool.length);
            setRandomValueIdx(rvIdx);
            setRandomValue(areaPool[rvIdx]);
            setPoolUpdated(false);
        },
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
    if (randomValueIdx === -1) {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
  }, [randomValueIdx]);

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
          let localAreaPool = [...area];
          for (let index = 1; index < repeat; index++) {
            localAreaPool = localAreaPool.concat([...area]);
          }
          return localAreaPool;
      }
    };
    if (done) {
      setRandomValueIdx(-1);
    } else {
      setAreaPool(initializeAreaPool());
    }
  }, [done, type, area, repeat]);

  /**
   * Effect to update valid values when they are not allowed to be repeated
   */
  useEffect(() => {
    if (repeat !== 0 && !poolUpdated && randomValueIdx >= 0) {
      Promise.resolve(setPoolUpdated(true)).then(() =>
        setTimeout(
          () => {
            const modAreaPool = areaPool.filter((v, i) => i !== randomValueIdx);
            setAreaPool(modAreaPool);
        },
          200
        )
      );
    }
  }, [randomValueIdx, areaPool, repeat, poolUpdated]);

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
          randomValue={randomValue}
          areaPool={areaPool}
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
