import { useContext, useState } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/appContext";

export default function NavBar() {
  const { setShow } = useContext(AppContext);
  const { words, sentences, applyFilter, isWord, isSentence } =
    useContext(AppContext);

  const handleShow = () => setShow(true);

  // hadleSearch FUNCTION TO DO A DINAMIC SEARCH AND FILTER THE WORDS LIST

  const handleSearch = (value) => {
    // console.log(value);
    const data = isSentence() ? sentences : words;
    applyFilter(value, data);
  };

  const getButtonName =
    isWord() || isSentence() ? (
      <Button variant="primary" onClick={handleShow}>
        {isWord() ? "Add Word" : "Add Sentence"}
      </Button>
    ) : null;

  const getSearchField = isWord() ? (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search word..."
        className="me-5"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </Form>
  ) : isSentence() ? (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search sentence..."
        className="me-5"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </Form>
  ) : null;

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">Duo_Dict</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/words/w/word/asc">Word list</Nav.Link>
              <Nav.Link href="/words/s/word/asc">Sentences list</Nav.Link>
            </Nav>
            {getSearchField}
            {getButtonName}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
