import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ModalCrud() {
  const initialState = { word: "", translation: "", comment: "" };
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const wordPath = "/words/w/word/asc";
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
      navigate(`${wordPath}`);
    }, 200);
  };

  const handleClose = () => close();

  const handleSubmit = async (e) => {
    e.preventDefault();

    newWord.type = "W";

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
        {/* ====================== USER SELECTION */}
        <Form>
          <Form.Group className="mb-3" controlId="FormFieldUser">
            <Form.Control
              type="text"
              placeholder="User"
              name="user"
              value={(newWord.user = "José")}
              onChange={handleChange}
            />
          </Form.Group>
          {/* ====================== LANGUAGE SELECTION */}
          <Form.Group className="mb-3" controlId="FormFieldLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="language"
              value={newWord.language}
              onChange={handleChange}
            >
              <option value="">Click to show options</option>
              <option value="EN">English</option>
              <option value="IT">Italian</option>
            </Form.Select>
          </Form.Group>
          {/* ====================== INPUT WORD */}
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
          {/* ====================== INPUT TRANSLATION */}
          <Form.Group className="mb-3" controlId="FormFieldTranslate">
            <Form.Label>Translation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the word translation"
              name="translate"
              value={newWord.translate}
              onChange={handleChange}
            />
          </Form.Group>
          {/* ====================== INPUT COMMENT */}
          <Form.Group className="mb-3" controlId="FormFieldComment">
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
