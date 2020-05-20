import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container } from "react-bootstrap";
import ReactionButton, { ReactionButtonProps } from "./ReactionButton";

interface TextWorkoutDisplayProps {
  randomValue: string;
  reactionButtonProps: ReactionButtonProps;
}

const TextWorkoutDisplay: React.FC<TextWorkoutDisplayProps> = (props) => {
  const {
    randomValue,
    reactionButtonProps,
  } = props;
  const {
    runTimeBasedReaction,
    setRunTimeBasedReaction,
    setNeedNewRandomValue,
  } = reactionButtonProps;
  const { width, height } = useWindowSize();

  return (
    <>
      <Container
        style={{
          width: width,
          height: height / 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "5rem",
        }}
      >
        {randomValue}
      </Container>
      <Container
        style={{
          width: width,
          height: height / 2 - 56,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ReactionButton
          runTimeBasedReaction={runTimeBasedReaction}
          setRunTimeBasedReaction={setRunTimeBasedReaction}
          setNeedNewRandomValue={setNeedNewRandomValue}
        />
      </Container>
    </>
  );
};

export default TextWorkoutDisplay;
