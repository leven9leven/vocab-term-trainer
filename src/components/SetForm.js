import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../Store";

import styled from "styled-components";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Styles = styled.div`
  .container {
    padding-top: 20px;
    width: 500px;
    align-content: center;
  }

  .form-group {
    text-align: left;
  }

  .btn {
    margin: 15px;
    margin-top: 0px;
  }
`;

export default function SetForm({ newSet, updateCallback }) {
  // Global state storing all sets
  const [data, setData] = useContext(DataContext);

  // Active form data
  const [formData, setFormData] = useState({
    setName: "",
    description: "",
  });

  // Changes the text of the submit if user is editing
  const [submitText, setText] = useState("Add");

  // same as componentWillReceiveProps
  useEffect(() => {
    console.log(newSet);
    setFormData({
      setName: newSet.setName,
      description: newSet.description,
    });
    if (newSet.id != null) {
      setText("Update");
    } else {
      setText("Add");
    }
  }, [newSet]);

  // Updates or adds set name
  const handleSetName = (event) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      setName: event.target.value,
    }));
  };

  // Updates or adds set description
  const handleDescription = (event) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      description: event.target.value,
    }));
  };

  // Adds a set or updates a set
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newSet.id === null) {
      const insertForm = {
        id: Math.floor(Math.random() * 99999999),
        setName: formData.setName,
        description: formData.description,
        questions: [],
      };
      setData([...data, insertForm]);
      setFormData({ setName: "", description: "" });
    } else {
      let tempData = data;
      tempData[newSet.index] = {
        id: newSet.id,
        setName: formData.setName,
        description: formData.description,
        questions: newSet.questions,
      };

      // perform callback that resets the id and other parameters in sets.js
      updateCallback(tempData);
    }
  };

  // Resets active form data
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ setName: "", description: "" });
  };

  return (
    <Styles>
      <div className="container">
        <Form>
          <Form.Group controlId="formBasicEmail" className="form-group">
            <Form.Label>Set Name:</Form.Label>
            <Form.Control placeholder="Name" onChange={handleSetName} value={formData.setName} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="form-group">
            <Form.Label>Short description:</Form.Label>
            <Form.Control placeholder="Description" onChange={handleDescription} value={formData.description} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
            {submitText}
          </Button>

          <Button variant="danger" type="submit" onClick={(e) => handleReset(e)}>
            Reset
          </Button>
        </Form>
      </div>
    </Styles>
  );
}
