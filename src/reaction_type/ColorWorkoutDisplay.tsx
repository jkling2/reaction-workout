import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container } from "react-bootstrap";

const ColorWorkoutDisplay: React.FC<{ randomValue: string }> = (
  props
) => {
  const { width, height } = useWindowSize();

  return (
    <Container
      style={{
        width: width,
        height: height / 3,
        display: "flex",
        justifyContent: "center",
        backgroundColor: props.randomValue,
      }}
    />
  );
};

export default ColorWorkoutDisplay;
