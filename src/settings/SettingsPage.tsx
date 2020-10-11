import React, { useContext, useState } from "react";
import { Container, InputGroup, Form, Button, Row } from "react-bootstrap";
import {
  ReactionKind,
  ReactionWorkoutContext,
} from "../context/ReactionWorkoutContext";
import { useHistory } from "react-router-dom";
import NumberAreaModal from "../reaction_type/ReactionTypeNumberAreaDisplay";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";
import ColorAreaModal from "../reaction_type/ReactionTypeColorAreaDisplay";
import NameAreaModal from "../reaction_type/ReactionTypeNameAreaDisplay";
import DirectionAreaModal from "../reaction_type/ReactionTypeDirectionAreaDisplay";

const SettingsPage: React.FC = () => {
  const {
    type,
    area,
    kind,
    time,
    repeat,
    setType,
    setKind,
    setTime,
    setRepeat,
  } = useContext(ReactionWorkoutContext);

  const history = useHistory();

  const [validate, setValidate] = useState(false);

  const [showNumberAreaModal, setShowNumberAreaModal] = useState(false);
  const [showColorAreaModal, setShowColorAreaModal] = useState(false);
  const [showNameAreaModal, setShowNameAreaModal] = useState(false);
  const [showDirectionAreaModal, setShowDirectionAreaModal] = useState(false);

  const showModal = () => {
    switch (type) {
      case ReactionType.NUMBER:
        setShowNumberAreaModal(true);
        break;
      case ReactionType.COLOR:
        setShowColorAreaModal(true);
        break;
      case ReactionType.NAME:
        setShowNameAreaModal(true);
        break;
      case ReactionType.DIRECTION:
        setShowDirectionAreaModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container style={{ maxWidth: "30rem" }}>
      {showNumberAreaModal && (
        <NumberAreaModal
          show={showNumberAreaModal}
          hide={() => setShowNumberAreaModal(false)}
        />
      )}
      {showColorAreaModal && (
        <ColorAreaModal
          show={showColorAreaModal}
          hide={() => setShowColorAreaModal(false)}
        />
      )}
      {showNameAreaModal && (
        <NameAreaModal
          show={showNameAreaModal}
          hide={() => setShowNameAreaModal(false)}
        />
      )}
      {showDirectionAreaModal && (
        <DirectionAreaModal
          show={showDirectionAreaModal}
          hide={() => setShowDirectionAreaModal(false)}
        />
      )}
      <Form>
        <Form.Group controlId="formType" className="mt-3 ml-3 mr-3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Type</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg"
              as="select"
              value={type}
              onChange={(event: { currentTarget: { value: string } }) =>
                setType(parseInt(event.currentTarget.value))
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
            <Button bsPrefix="form-control form-fg" onClick={showModal}>
              {area.length === 0 ? "click to select" : area.join(", ")}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formKind" className="mt-3 ml-3 mr-3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Kind</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              bsPrefix="form-control form-fg"
              as="select"
              value={kind}
              onChange={(event: { currentTarget: { value: string } }) =>
                setKind(parseInt(event.currentTarget.value))
              }
            >
              <option value={0}>on Click</option>
              <option value={1}>time</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
        {kind === ReactionKind.TIME && (
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
                isInvalid={validate && time <= 0}
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
              <Form.Control.Feedback type="invalid" tooltip>
                The time must be greater than <b>0</b> sec.
              </Form.Control.Feedback>
              <InputGroup.Append>
                <InputGroup.Text>sec</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        )}
        {type === ReactionType.NUMBER && (
          <Form.Group
            controlId="formRepeatElement"
            className="mt-4 ml-3 mr-3 mb-4"
            defaultChecked={repeat === 0}
          >
            <Form.Check
              type="checkbox"
              label="Repeat Elements"
              checked={repeat === 0}
              onChange={(event: { currentTarget: { checked: boolean } }) => {
                setRepeat(event.currentTarget.checked ? 0 : 1);
              }}
            />
          </Form.Group>
        )}
        {type !== ReactionType.NUMBER && (
          <Form.Group
            as={Row}
            controlId="formRepeatElement"
            className="ml-3 mr-3"
          >
            <Form.Label className="mt-2">Repeat</Form.Label>
            <Form.Control
              className="ml-1 mr-1"
              bsPrefix="form-fg-width form-control form-fg-dark"
              type="number"
              min="0"
              max="10"
              value={repeat === 0 ? "" : repeat}
              onChange={(event: { currentTarget: { value: string } }) => {
                setRepeat(parseInt(event.currentTarget.value));
              }}
            />
            <Form.Label className="mt-2">
              {repeat === 0 ? "infinitely" : repeat === 1 ? "time" : "times"}
            </Form.Label>
          </Form.Group>
        )}
        <Form.Row className="justify-content-center">
          <Button
            id="button-fg"
            type="button"
            onClick={() => {
              if (kind === 0 || time > 0) {
                history.push("/workout" + history.location.search);
              } else {
                setValidate(true);
              }
            }}
          >
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default SettingsPage;
