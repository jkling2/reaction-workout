import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container } from "react-bootstrap";
import ReactionButton, { ReactionButtonProps } from "./ReactionButton";

interface ColorWorkoutDisplayProps {
  randomValue: string;
  defaultBackground: string;
  reactionButtonProps: ReactionButtonProps;
}

const ColorWorkoutDisplay: React.FC<ColorWorkoutDisplayProps> = (props) => {
  const {
    randomValue,
    defaultBackground,
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
          backgroundColor: randomValue,
        }}
      />
      <Container
        style={{
          width: width,
          height: height / 2 - 56,
          display: "flex",
          justifyContent: "center",
          backgroundColor: randomValue === "" ? defaultBackground : randomValue,
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

export default ColorWorkoutDisplay;
