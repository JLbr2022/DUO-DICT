import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AppContext } from "../../context/appContext";
import "./ModalEdit.css";

const initialState = {
  user: "",
  language: "",
  word: "",
  translate: "",
  comment: "",
};

export default function ModalEdit() {
  const location = useLocation();
  const isWord = location.pathname.includes("/words/w");
  const [editWord, setEditWord] = useState(initialState);
  const {
    getWords,
    getSentences,
    putWord,
    putSentence,
    selectedWord,
    showEdit,
    setShowEdit,
  } = useContext(AppContext);

  useEffect(() => {
    setEditWord(selectedWord);
  }, [selectedWord]);

  // console.log(selectedWord);

  if (showEdit) console.log("ModalEdit => ", { editWord });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setEditWord({ ...editWord, [name]: value });
  };

  // CLOSE MODAL AND RESET STATE
  const handleClose = () => {
    setShowEdit(false);
  };

  // POST WORD/SENTENCE IF isWord = true: TYPE = "W" ELSE TYPE = "S"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isWord) {
        await putWord(editWord.id, { ...editWord, type: "W" });
        getWords();
      } else {
        await putSentence(editWord.id, { ...editWord, type: "S" });
        getSentences();
        console.log(editWord);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showEdit} onHide={handleClose} className="textColorBlack">
      <Modal.Header closeButton>
        <Modal.Title>
          {isWord ? "Modifying word" : "Modifying sentence"}
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
              value={editWord.user || ""} // <== HERE ADDING SPACES TO AVOID A WARNING IN THE CONSELE
              onChange={handleChange}
            />
          </Form.Group>
          {/* ====================== LANGUAGE SELECTION */}
          <Form.Group className="mb-3" controlId="FormFieldLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="language"
              value={editWord.language || ""} // <== HERE ADDING SPACES TO AVOID A WARNING IN THE CONSELE
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
              value={editWord.word || ""} // <== HERE ADDING SPACES TO AVOID A WARNING IN THE CONSELE
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
              value={editWord.translate || ""} // <== HERE ADDING SPACES TO AVOID A WARNING IN THE CONSELE
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
              value={editWord.comment || ""} // <== HERE ADDING SPACES TO AVOID A WARNING IN THE CONSELE
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
