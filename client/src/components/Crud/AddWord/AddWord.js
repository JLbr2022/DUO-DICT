import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddWord({ show, handleClose }) {
  const [showModal, setShowModal] = useState(false);
  const [newWord, setNewWord] = useState({
    word: "",
    translation: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });

      if (response.ok) {
        setShowModal(false);
        setNewWord({ word: "", translation: "", comment: "" });
      } else {
        throw new Error("Something went wrong while creating the new word");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adding Word</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="FormFieldWord">
            <Form.Label>Word</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a word"
              name="word"
              value={newWord.word}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="FormFieldTranslation">
            <Form.Label>Translation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the word translation"
              name="translation"
              value={newWord.translation}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter any comment"
              name="comment"
              value={newWord.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddWord;
