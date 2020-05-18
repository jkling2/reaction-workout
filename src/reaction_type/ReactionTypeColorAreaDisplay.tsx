import React, { useState, useContext } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";

const ColorAreaModal: React.FC<{ show: boolean; hide: Function }> = (props) => {
  const { area, setArea } = useContext(ReactionWorkoutContext);

  const colors: string[] = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "indigo",
    "purple",
    "pink",
    "cyan",
    "grey",
    "white",
    "black",
  ];

  const colorIdxs: number[][] = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
  ];

  const [selectedColors, setSelectedColors] = useState<boolean[]>(
    Array(colors.length)
      .fill(false)
      .map((v, i) => area.indexOf(colors[i]) >= 0)
  );

  const setSeledctedColor = (colorIdx: number) => {
    const newSelectedColors = [...selectedColors];
    newSelectedColors[colorIdx] = !newSelectedColors[colorIdx];
    setSelectedColors(newSelectedColors);
  };

  const ColorPalette: React.FC<{ setSeledctedColor: Function }> = (props) => {
    return (
      <>
        {colorIdxs.map((colorIdxRow, i) => (
          <Row className="justify-content-center" key={i}>
            {colorIdxRow.map((colorIdx) => (
              <span 
                key={colorIdx}
                role="button" 
                id="select-color"
                className="mt-2 ml-1 mr-1"
                style={{ backgroundColor: colors[colorIdx] }}
                onClick={() => props.setSeledctedColor(colorIdx)}
              >
                <input
                  id="select-color-check"
                  type="checkbox"
                  key={colorIdx+"check"}
                  checked={selectedColors[colorIdx]}
                  readOnly
                />
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
        <Modal.Title id="contained-modal-title-vcenter">Colors</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-rest-fg">
        <ColorPalette setSeledctedColor={setSeledctedColor} />
      </Modal.Body>
      <Modal.Footer className="modal-rest-fg">
        <Button
          id="button-fg"
          onClick={() => {
            setArea(colors.filter((v, i) => selectedColors[i]));
            props.hide();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ColorAreaModal;
