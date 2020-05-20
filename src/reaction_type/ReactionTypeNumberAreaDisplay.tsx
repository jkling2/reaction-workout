import React, { useState, useContext } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";

const NumberAreaModal: React.FC<{ show: boolean, hide: Function}> = props => {
    const {
        area,
        setArea,
      } = useContext(ReactionWorkoutContext);

    const [areaValues, setAreaValues] = useState([...area]);
    const [validRange, setValidRange] = useState(parseInt(areaValues[0]) <= parseInt(areaValues[1]));

    return (
      <Modal
        show={props.show}
        size="sm"
        centered
        onHide={props.hide}
      >
        <Modal.Header className="modal-head-fg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Min & max Numbers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-rest-fg">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>min</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg-dark"
              type="text"
              pattern="[0-9]*"
              placeholder="minimal number"
              isInvalid={!validRange}
              value={parseInt(areaValues[0]) < 0 ? "" : parseInt(areaValues[0])}
              onChange={(event: { currentTarget: { value: string } }) => {
                  if (
                  isNaN(parseInt(event.currentTarget.value)) ||
                  event.currentTarget.value.length === 0
                ) {
                  setAreaValues(["-1", areaValues[1]]);
                } else {
                  setAreaValues([parseInt(event.currentTarget.value).toString(), areaValues[1]]);
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
            The min-number must be smaller than or equal to the max-number.
          </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mt-2">
            <InputGroup.Prepend>
              <InputGroup.Text>max</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg-dark"
              type="text"
              pattern="[0-9]*"
              placeholder="maximal number"
              isInvalid={!validRange}
              value={parseInt(areaValues[1]) < 0 ? "" : parseInt(areaValues[1])}
              onChange={(event: { currentTarget: { value: string } }) => {
                if (
                  isNaN(parseInt(event.currentTarget.value)) ||
                  event.currentTarget.value.length === 0
                ) {
                  setAreaValues([areaValues[0], "-1"]);
                } else {
                  setAreaValues([areaValues[0], event.currentTarget.value]);
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
          </Form.Control.Feedback>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="modal-rest-fg">
          <Button
            id="button-fg"
            onClick={() => {
                if (parseInt(areaValues[0]) > parseInt(areaValues[1])) {
                    setValidRange(false);
                } else {
                    setArea(areaValues);
                    props.hide();
                }   
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default NumberAreaModal;