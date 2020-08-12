import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Styles = styled.div`
  .flashcards-div {
    padding-top: 20px;
    width: 700px;
    align-content: center;
    margin: 0 auto;
  }

  .btn {
    margin: 20px;
    margin-bottom: 0px;
  }

  .btn-flashcard {
    margin-top: 70px;
    margin-bottom: -30px;
  }
`;

const Practice = (props) => {
  // Shows flashcard view
  const [showFlashcards, toggleFlashcards] = useState(false);

  // Shows write view
  const [showWrite, toggleWrite] = useState(false);

  // Active question index
  const [questionNum, updateActiveQuestion] = useState(0);

  // State of the current question or answer being displayed
  const [cardDisplay, updateCardState] = useState({
    side: 0,
    display: props.location.inputSet.questions[questionNum].question,
  });

  // Data from the writing input form
  const [writeAnswer, updateWriteAnswer] = useState("");

  // Border of the form either green (correct), red (incorrect), or black
  const [formStyle, updateFormStyle] = useState({ border: "1px solid black" });

  // Submits the current input
  const submitWriteAnswer = (e) => {
    e.persist();

    updateWriteAnswer(e.target.value);
  };

  // Checks if answer is correct or incorrect
  // Updates form styles
  const checkAnswer = () => {
    if (writeAnswer === props.location.inputSet.questions[questionNum].answer) {
      setTimeout(function () {
        updateFormStyle({ border: "1px solid black" });
        updateWriteAnswer("");
      }, 1500);

      incrementQuestion();
      updateCardState({
        side: 0,
        display: props.location.inputSet.questions[questionNum].question,
      });
      updateFormStyle({ border: "3px solid seagreen" });
    } else {
      setTimeout(function () {
        updateFormStyle({ border: "1px solid black" });
      }, 1500);
      updateFormStyle({ border: "3px solid lightsalmon" });
    }
  };

  // Fills form with answer to question
  const displayAnswer = () => {
    updateWriteAnswer(props.location.inputSet.questions[questionNum].answer);
  };

  // Resets the question index to 0
  const restartPractice = () => {
    updateActiveQuestion(0);
  };

  // Flips the card in flashcard mode
  const flipCard = () => {
    if (cardDisplay.side === 0) {
      updateCardState({
        side: 1,
        display: props.location.inputSet.questions[questionNum].answer,
      });
    } else {
      updateCardState({
        side: 0,
        display: props.location.inputSet.questions[questionNum].question,
      });
    }
  };

  // Increments active question index
  const incrementQuestion = () => {
    if (questionNum < props.location.inputSet.questions.length - 1) {
      updateActiveQuestion(questionNum + 1);
    }
    updateFormStyle({ border: "1px solid black" });
  };

  // Decrements active question index
  const decrementQuestion = () => {
    if (questionNum > 0) {
      updateActiveQuestion(questionNum - 1);
    }
    updateFormStyle({ border: "1px solid black" });
  };

  // Updates question display when question index is incremented
  useEffect(() => {
    updateCardState({
      side: 0,
      display: props.location.inputSet.questions[questionNum].question,
    });
  }, [props.location.inputSet.questions, questionNum]);

  return (
    <Styles>
      <div className="flashcards-div">
        <Jumbotron>
          <h1>Welcome to practice!</h1>
          <h3>Select mode below</h3>
          <p>You are currently practicing {props.location.inputSet.setName}</p>
          <p>
            <Button
              className="btn"
              variant="primary"
              onClick={() => toggleFlashcards(!showFlashcards)}
              aria-controls="flashcards-show"
              aria-expanded={showFlashcards}
            >
              Flashcards
            </Button>
            <Button
              className="btn"
              variant="primary"
              onClick={() => toggleWrite(!showWrite)}
              aria-controls="write-show"
              aria-expanded={showWrite}
            >
              Write
            </Button>
          </p>
        </Jumbotron>

        <Collapse in={showFlashcards}>
          <div id="flashcards-show">
            <Jumbotron>
              <h5>{cardDisplay.display}</h5>
              <p>
                <Button className="btn-flashcard" variant="danger" onClick={decrementQuestion}>
                  Back
                </Button>
                <Button className="btn-flashcard" variant="primary" onClick={flipCard}>
                  Flip
                </Button>
                <Button className="btn-flashcard" variant="success" onClick={incrementQuestion}>
                  Next
                </Button>
              </p>
            </Jumbotron>
          </div>
        </Collapse>

        <Collapse in={showWrite}>
          <div id="write-show">
            <Form>
              <Form.Group as={Row} controlId="formPlaintextQuestion">
                <Form.Label column sm="2">
                  Q:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={cardDisplay.display} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  A:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Answer"
                    onChange={submitWriteAnswer}
                    value={writeAnswer}
                    style={formStyle}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Button variant="primary" type="submit" onClick={checkAnswer}>
              Submit
            </Button>
            <Button type="submit" variant="secondary" onClick={displayAnswer}>
              View answer
            </Button>
            <Button type="submit" variant="danger" onClick={restartPractice}>
              Restart
            </Button>
          </div>
        </Collapse>
      </div>
    </Styles>
  );
};

export default Practice;
