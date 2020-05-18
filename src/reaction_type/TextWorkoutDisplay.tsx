import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Container } from "react-bootstrap";

const TextWorkoutDisplay: React.FC<{ randomValue: string }> = (
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
        fontSize: "5rem",
      }}
    >
      <div style={{ position: "relative", top: "30%" }}>
        {props.randomValue}
      </div>
    </Container>
  );
};

export default TextWorkoutDisplay;
