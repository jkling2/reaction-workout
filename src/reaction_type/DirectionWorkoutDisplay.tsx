import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container, Row } from "react-bootstrap";
import { directionIdxs, directions } from "./ReactionTypeDirectionAreaDisplay";

const DirectionWorkoutDisplay: React.FC<{ reactionButton: React.FC, areaPool: String[], randomValue: string }> = (
  props
) => {
  const { height } = useWindowSize();

  return (
    <Container
      style={{
        width: "30rem",
        height: height / 3,
      }}>
        {directionIdxs.map((directionIdxRow, i) => (
          <Row className="justify-content-center" key={i}>
            {directionIdxRow.map((directionIdx) => (
              <>
              <span
                key={directionIdx}
                id={
                  props.areaPool.indexOf(directions[directionIdx]) > 0
                  ? "span-direction-selected"
                  : "span-direction"
                }
                className="span-direction"
                >
                {directionIdx === 12  && <props.reactionButton/>}
                {directions[directionIdx]}
              </span>
              </>
            ))}
          </Row>
        ))}
      </Container>
  );
};

export default DirectionWorkoutDisplay;
