import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddWordForm(props) {
  const [user, setUser] = useState("");
  const [language, setLanguage] = useState("");
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newWord = { user, language, word, translate, comment };
    fetch("http://localhost:4000/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUser("");
        setLanguage("");
        setWord("");
        setTranslate("");
        setComment("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUser">
        <Form.Label>User</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formWord">
        <Form.Label>Word</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formTranslate">
        <Form.Label>Translate</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter translate"
          value={translate}
          onChange={(e) => setTranslate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddWordForm;
