import React, { useState, useContext } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";
import { ReactionWorkoutContext } from "../context/ReactionWorkoutContext";

const NameAreaModal: React.FC<{ show: boolean, hide: Function}> = props => {
    const {
        area,
        setArea,
      } = useContext(ReactionWorkoutContext);

    const [areaValues, setAreaValues] = useState([...area]);
    const [newValue, setNewValue] = useState("");

    const changeAreaValuesAtIndex = (idx: number, val: string) => {
      const newAreaValues = [...areaValues];
      newAreaValues[idx] = val;
      setAreaValues(newAreaValues);
    }

    const deleteAreaValuesAtIndex = (idx: number) => {
      const newAreaValues = [...areaValues].filter((v, i) => i !== idx);
      setAreaValues(newAreaValues);
    }

    const NameItem: React.FC<{name: string, idx: number}> = props => {
      const [currentName, setCurrentName] = useState(props.name);
      return (
        <InputGroup>
      <Form.Control
            bsPrefix="form-control form-fg-dark"
            type="text"
            placeholder="new name"
            value={currentName}
            onChange={(event: { currentTarget: { value: string } }) => setCurrentName(event.currentTarget.value)}
          />
          <InputGroup.Prepend >
          <span role="button" aria-label="checkmark" onClick={() => changeAreaValuesAtIndex(props.idx, currentName)}>✔</span>
          <span role="button" aria-label="delete" onClick={() => deleteAreaValuesAtIndex(props.idx)}>✖</span>
          </InputGroup.Prepend>
      </InputGroup>)
    };

    return (
      <Modal
        show={props.show}
        size="sm"
        centered
        onHide={props.hide}
      >
        <Modal.Header className="modal-head-fg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Names
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-rest-fg">
          {areaValues.map((name, i) => <NameItem name={name} idx={i} key={i}/>)}

          <InputGroup className="mt-3">
            <Form.Control
              bsPrefix="form-control form-fg-dark"
              type="text"
              placeholder="new name"
              value={newValue}
              onChange={(event: { currentTarget: { value: string } }) => setNewValue(event.currentTarget.value)}
            />
            <InputGroup.Prepend onClick={() => {
              if (newValue !== "") {
                setAreaValues([...areaValues, newValue]);
                setNewValue("");
              }
            }}>
            <span role="button" aria-label="checkmark">✔</span>
            </InputGroup.Prepend>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="modal-rest-fg">
          <Button
            id="button-fg"
            onClick={() => {
                    setArea(areaValues);
                    props.hide();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default NameAreaModal;