import React, { useContext, useState } from "react";
import { Container, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";
import { useHistory } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const {
    mode,
    area,
    reaction,
    time,
    repeat,
    setMode,
    setArea,
    setReaction,
    setTime,
    setRepeat,
  } = useContext(ReactionWorkoutContext);

  const history = useHistory();

  const [showAreaModal, setShowAreaModal] = useState(false);
  const NumberAreaModal: React.FC = () => {
    const [areaValues, setAreaValues] = useState([...area]);
    // TODO: verify that min < max; handle letters!; negative values??
    return (
      <Modal
        show={showAreaModal}
        size="sm"
        centered
        onHide={() => setShowAreaModal(false)}
      >
        <Modal.Header className="modal-head-fg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Max & max Numbers
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
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>max</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg-dark"
              type="text"
              pattern="[0-9]*"
              placeholder="maximal number"
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
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="modal-rest-fg">
          <Button
            id="button-fg"
            onClick={() => {
              setArea(areaValues);
              setShowAreaModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container style={{ maxWidth: "30rem" }}>
      <NumberAreaModal />
      <Form>
        <Form.Group controlId="formModus" className="mt-3 ml-3 mr-3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Modus</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg"
              as="select"
              value={mode}
              onChange={(event: { currentTarget: { value: string } }) =>
                setMode(parseInt(event.currentTarget.value))
              }
            >
              <option value={0}>Numbers</option>
              <option value={1}>Colors</option>
              <option value={2}>Names</option>
              <option value={3}>Directions</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formArea" className="mt-3 ml-3 mr-3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Area</InputGroup.Text>
            </InputGroup.Prepend>
            <Button
              bsPrefix="form-control form-fg"
              onClick={() => setShowAreaModal(true)}
            >
              {area.join(", ")}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formReactionMode" className="mt-3 ml-3 mr-3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Reaction Mode</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg"
              as="select"
              value={reaction}
              onChange={(event: { currentTarget: { value: string } }) =>
                setReaction(parseInt(event.currentTarget.value))
              }
            >
              <option value={0}>on Click</option>
              <option value={1}>time</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
        {reaction === 1 && (
          <Form.Group controlId="formTime" className="mt-3 ml-3 mr-3">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Time</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                bsPrefix="form-control form-fg"
                type="text"
                pattern="[0-9]*"
                placeholder="change after sec"
                value={time <= 0 ? "" : time}
                onChange={(event: { currentTarget: { value: string } }) => {
                  if (
                    isNaN(parseInt(event.currentTarget.value)) ||
                    event.currentTarget.value.length === 0
                  ) {
                    setTime(0);
                  } else {
                    setTime(parseInt(event.currentTarget.value));
                  }
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>sec</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        )}
        <Form.Group
          controlId="formRepeatElement"
          className="mt-3 ml-3 mr-3"
          defaultChecked={repeat}
        >
          <Form.Check
            type="checkbox"
            label="Repeat Elements"
            onChange={(event: { currentTarget: { checked: boolean } }) => {
              setRepeat(event.currentTarget.checked);
            }}
          />
        </Form.Group>
        <Form.Row className="justify-content-center">
          <Button id="button-fg" type="button" onClick={ () => {
              history.push("/workout" + history.location.search);
          }}>
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default SettingsPage;
