import React, { useContext, useState, useCallback } from "react";
import { DataContext } from "../Store";

import styled from "styled-components";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import SetForm from "../components/SetForm";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import QuestionForm from "../components/QuestionForm";

const Styles = styled.div`
  .container {
    width: 500px;
    align-content: center;
  }

  .card {
    padding: 15px;
    text-align: left;
    margin-bottom: 20px;
    margin-top: 15px;
  }

  .badge {
    margin-left: 5px;
  }

  .btns {
    text-align: center;
  }

  .btn {
    margin: 10px;
  }

  .add-questions-btn {
    margin-left: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 6px;
    padding-right: 6px;
    border: 1px solid lightgray;
  }
`;

export default function Sets() {
  // Global state storing all sets
  const [data, setData] = useContext(DataContext);

  // Tracks if a set is being edited
  const [editedSet, updateSet] = useState({
    setName: "",
    description: "",
    id: null,
    index: null,
    questions: [],
  });

  // Tracks which set questions are being updated
  const [addArr, setShowAdd] = useState([false, false]);

  // Force update state
  const [updateCount, updateView] = useState(0);

  // Updates set form with the current set's values
  // Allows set name and description to be updated
  const editSet = (set, editIndex) => {
    updateSet({
      setName: set.setName,
      description: set.description,
      id: set.id,
      index: editIndex,
      questions: set.questions,
    });
  };

  // Deletes current set
  const deleteSet = (index) => {
    let tempData = data;
    tempData.splice(index, 1);
    updateView(updateCount + 1);
    setData(tempData);
  };

  // Call back from set form to update the name and description of edited set
  const updateEdits = useCallback(
    (newData) => {
      setData(newData);

      updateSet({ setName: "", description: "", id: null, index: null, questions: [] });
    },
    [setData]
  );

  // Displays the questions for the selected set
  const toggleAdd = (index) => {
    let tempData = addArr;
    tempData[index] = !tempData[index];
    updateView(updateCount + 1);
    setShowAdd(tempData);
  };

  return (
    <Styles>
      <SetForm newSet={editedSet} updateCallback={updateEdits} />
      {data.map((set, index) => (
        <div className="container" key={set.id}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>
                  {set.setName} <Badge variant="primary">{set.questions.length}</Badge>
                  <Button
                    variant="light"
                    className="add-questions-btn"
                    onClick={() => toggleAdd(index)}
                    aria-controls="questions-show"
                    aria-expanded={addArr[index]}
                  >
                    +
                  </Button>
                </h3>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Vocab set</Card.Subtitle>
              <Card.Text>{set.description}</Card.Text>
              <div className="btns">
                <Button variant="outline-primary" className="btn" onClick={() => editSet(set, index)}>
                  Edit
                </Button>

                <Button variant="outline-danger" onClick={() => deleteSet(index)}>
                  Delete
                </Button>

                <Link to={{ pathname: "/practice", inputSet: set }}>
                  <Button variant="outline-success">Practice</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
          <Collapse in={addArr[index]}>
            <div id="questions-show">
              <QuestionForm questions={set.questions} currIndex={index} closeCallback={toggleAdd} />
            </div>
          </Collapse>
        </div>
      ))}
    </Styles>
  );
}
