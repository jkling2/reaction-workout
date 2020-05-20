import React, { useContext } from "react";
import { ReactionWorkoutContext, ReactionKind } from "../context/ReactionWorkoutContext";
import { Button } from "react-bootstrap";

export interface ReactionButtonProps {
    runTimeBasedReaction: boolean;
    setRunTimeBasedReaction: Function;
    setNeedNewRandomValue: Function;
};

const ReactionButton: React.FC<ReactionButtonProps> = props => {
    const { kind } = useContext(ReactionWorkoutContext);
    const { runTimeBasedReaction, setRunTimeBasedReaction, setNeedNewRandomValue } = props;
    return (
      <>
        {kind === ReactionKind.TIME && (
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
        {kind === ReactionKind.ON_CLICK && (
          <Button
            id="button-fg"
            className="button-big-circle-centered"
            onClick={() => setNeedNewRandomValue(true)}
          >
            click
          </Button>
        )}
      </>
    );
  };

  export default ReactionButton;