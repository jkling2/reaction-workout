import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Row } from "react-bootstrap";
import { directionIdxs, directions } from "./ReactionTypeDirectionAreaDisplay";
import ReactionButton, { ReactionButtonProps } from "./ReactionButton";

interface DirectionWorkoutDisplayProps {
  randomValue: string;
  areaPool: String[];
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

  return (
    <Container
      style={{
        width: width,
        maxWidth: "30rem",
        height: height / 2,
      }}
    >
      {directionIdxs.map((directionIdxRow, i) => (
        <Row className="justify-content-center" key={i}>
          {directionIdxRow.map((directionIdx) => (
            <>
              <span
                key={directionIdx}
                id={
                  areaPool.indexOf(directions[directionIdx]) >= 0
                    ? "span-direction-selected"
                    : "span-direction"
                }
                className={directionIdx === 12 ? "span-direction span-direction-button" : 
                directions[directionIdx] === randomValue ? "span-direction span-direction-arrow blink-direction" : "span-direction span-direction-arrow"}
              >
                {directionIdx === 12 && (
                  <ReactionButton
                    runTimeBasedReaction={runTimeBasedReaction}
                    setRunTimeBasedReaction={setRunTimeBasedReaction}
                    setNeedNewRandomValue={setNeedNewRandomValue}
                  />
                )}
                {directions[directionIdx]}
                {console.log(directionIdx + ": " + directions[directionIdx] + ": " + areaPool.indexOf(directions[directionIdx]))}
              </span>
            </>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default DirectionWorkoutDisplay;
