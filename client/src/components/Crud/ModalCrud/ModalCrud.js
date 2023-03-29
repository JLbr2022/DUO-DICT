import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AppContext } from "../../context/appContext";

const initialState = {
  user: "José",
  language: "",
  word: "",
  translate: "",
  comment: "",
};

export default function ModalCrud() {
  const location = useLocation();
  const isWord = location.pathname.includes("/words/w");
  const [newWord, setNewWord] = useState({ ...initialState });
  const { getWords, postWord, show, setShow, getSentences, postSentence } =
    useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  // CLOSE MODAL AND RESET STATE
  const close = () => {
    setShow(false);
    setNewWord(initialState);
  };

  // CLOSE MODAL
  const handleClose = () => close();

  // POST WORD/SENTENCE IF isWord = true: TYPE = "W" ELSE TYPE = "S"
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isWord) {
        await postWord({ ...newWord, type: "W" });
        getWords();
      } else {
        await postSentence({ ...newWord, type: "S" });
        getSentences();
        console.log(newWord);
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isWord ? "Adding a word" : "Adding a sentence"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ====================== USER SELECTION */}
        <Form>
          <Form.Group className="mb-3" controlId="FormFieldUser">
            <Form.Control
              type="text"
              placeholder="User"
              name="user"
              value={newWord.user}
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
            <Form.Label>{isWord ? "Word" : "Sentence"}</Form.Label>
            <Form.Control
              type="text"
              placeholder={isWord ? "Enter a word" : "Enter a sentence"}
              name="word"
              value={newWord.word}
              onChange={handleChange}
            />
          </Form.Group>
          {/* ====================== INPUT TRANSLATION */}
          <Form.Group className="mb-3" controlId="FormFieldTranslate">
            <Form.Label>Translate</Form.Label>
            <Form.Control
              type="text"
              placeholder={
                isWord
                  ? "Enter the word translation"
                  : "Enter the sentence translation"
              }
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
