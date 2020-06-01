import React, { useContext } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Row } from "react-bootstrap";
import { directionIdxs, directions } from "./ReactionTypeDirectionAreaDisplay";
import ReactionButton, { ReactionButtonProps } from "./ReactionButton";
import {
  ReactionWorkoutContext,
  ReactionKind,
} from "../context/ReactionWorkoutContext";

interface DirectionWorkoutDisplayProps {
  randomValue: string;
  areaPool: string[];
  reactionButtonProps: ReactionButtonProps;
}

const DirectionWorkoutDisplay: React.FC<DirectionWorkoutDisplayProps> = (
  props
) => {
  const { randomValue, areaPool, reactionButtonProps } = props;
  const {
    runTimeBasedReaction,
    setRunTimeBasedReaction,
    setNeedNewRandomValue,
  } = reactionButtonProps;
  const { width, height } = useWindowSize();
  const { area, kind } = useContext(ReactionWorkoutContext);

  const blink = (directionIdx: number) => {
    if (randomValue === "") {
      return false;
    } else if (kind === ReactionKind.TIME && !runTimeBasedReaction) {
      return false;
    } else if (directions[directionIdx] !== randomValue) {
      return false;
    }
    return true;
  };

  return (
    <Container
      style={{
        width: width,
        maxWidth: "30rem",
        height: height - 56,
      }}
    >
      {directionIdxs.map((directionIdxRow, i) => (
        <Row className="justify-content-center" key={i}>
          {directionIdxRow.map((directionIdx) => (
            <span
              key={directionIdx}
              id={
                (areaPool.indexOf(directions[directionIdx]) >= 0) || (area.indexOf(directions[directionIdx]) >= 0 && blink(directionIdx))
                ? "span-direction-selected"
                :"span-direction"
                
              }
              className={
                directionIdx === 12
                  ? "span-direction span-direction-button"
                  : blink(directionIdx)
                  ? "span-direction span-direction-arrow blink-direction"
                  : "span-direction span-direction-arrow"
              }
            >
              {directionIdx === 12 && (
                <ReactionButton
                  runTimeBasedReaction={runTimeBasedReaction}
                  setRunTimeBasedReaction={setRunTimeBasedReaction}
                  setNeedNewRandomValue={setNeedNewRandomValue}
                />
              )}
              {directions[directionIdx]}
            </span>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default DirectionWorkoutDisplay;
