import React, { useState, useContext } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";

export const directions: string[] = [
  "🡔🡔",
  "",
  "🡑🡑",
  "",
  "🡕🡕",
  "",
  "🡔",
  "🡑",
  "🡕",
  "",
  "🡐🡐",
  "🡐",
  "",
  "🡒",
  "🡒🡒",
  "",
  "🡗",
  "🡓",
  "🡖",
  "",
  "🡗🡗",
  "",
  "🡓🡓",
  "",
  "🡖🡖",
];

export const directionIdxs: number[][] = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
];

const DirectionAreaModal: React.FC<{ show: boolean; hide: Function }> = (
  props
) => {
  const { area, setArea } = useContext(ReactionWorkoutContext);
  const [selectedDirections, setSelectedDirections] = useState<boolean[]>(
    Array(directions.length)
      .fill(false)
      .map((v, i) => area.indexOf(directions[i]) >= 0)
  );

  const setSelectedDirection = (directionIdx: number) => {
    const newSelectedDirection = [...selectedDirections];
    newSelectedDirection[directionIdx] = !newSelectedDirection[directionIdx];
    setSelectedDirections(newSelectedDirection);
  };

  const DirectionPalette: React.FC<{ setSelectedDirection: Function }> = (
    props
  ) => {
    return (
      <>
        {directionIdxs.map((directionIdxRow, i) => (
          <Row className="justify-content-center" key={i}>
            {directionIdxRow.map((directionIdx) => (
              <span
                key={directionIdx}
                role="button"
                id={
                  selectedDirections[directionIdx]
                    ? "span-direction-selected"
                    : "span-direction"
                }
                className="span-direction"
                onClick={() => setSelectedDirection(directionIdx)}
              >
                {directions[directionIdx]}
              </span>
            ))}
          </Row>
        ))}
      </>
    );
  };

  return (
    <Modal show={props.show} size="sm" centered onHide={props.hide}>
      <Modal.Header className="modal-head-fg" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Directions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-rest-fg">
        <DirectionPalette setSelectedDirection={setSelectedDirection} />
      </Modal.Body>
      <Modal.Footer className="modal-rest-fg">
        <Button
          id="button-fg"
          onClick={() => {
            setArea(directions.filter((v, i) => selectedDirections[i]));
            props.hide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DirectionAreaModal;
