import React, { useState, useContext } from "react";
import { DataContext } from "../Store";

import styled from "styled-components";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Styles = styled.div`
  .btns {
    text-align: center;
  }

  .form-group {
    text-align: left;
  }

  .divider {
    border-top: 8px solid lightblue;
    border-radius: 5px;
  }

  .question-btns {
    padding-bottom: 20px;
  }

  .btn {
    margin: 15px;
  }
`;

export default function QuestionForm({ questions, currIndex, closeCallback }) {
  // Global state storing all sets
  const [data, setData] = useContext(DataContext);

  const [currQuestions, updateQuestions] = useState(questions);

  // Saves all edited questions
  const handleSave = (e) => {
    e.preventDefault();

    let tempData = data;
    tempData[currIndex].questions = currQuestions;
    setData(tempData);

    // Perform callback to close the tab of questions
    // Current bug from bootstrap/react -> animation does not occur
    closeCallback(currIndex);
  };

  // Adds a blank question and answer to the set of questions
  const handleAddQuestion = (e) => {
    e.preventDefault();
    updateQuestions([...currQuestions, { question: "", answer: "" }]);
  };

  return (
    <Styles>
      {currQuestions.map((question, index) => (
        <div className="question-container" key={index}>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Q:
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows="3" defaultValue={question.question} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                A:
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows="2" defaultValue={question.answer} />
              </Col>
            </Form.Group>
          </Form>
          <hr className="divider" />
        </div>
      ))}

      <div className="question-btns">
        <Button variant="primary" type="submit" onClick={(e) => handleSave(e)}>
          Save and Close
        </Button>

        <Button variant="secondary" type="submit" onClick={(e) => handleAddQuestion(e)}>
          Add Question
        </Button>
      </div>
    </Styles>
  );
}
