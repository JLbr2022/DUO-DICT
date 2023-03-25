import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const initialState = { word: "", translation: "", comment: "" };

export default function ModalCrud() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [newWord, setNewWord] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const close = () => {
    setShow(false);
    setTimeout(() => {
      navigate("/words");
    }, 200);
  };

  const handleClose = () => close();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${serverUrl}words`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });
      close();
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