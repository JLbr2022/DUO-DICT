import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/appContext";

import SearchEngine from "../SearchEngine/SearchEngine";

export default function NavBar() {
  const { setShow, isWord, isSentence } = useContext(AppContext);

  const handleShow = () => setShow(true);

  const getButtonName =
    isWord() || isSentence() ? (
      <Button variant="primary" onClick={handleShow}>
        {isWord() ? "Add Word" : "Add Sentence"}
      </Button>
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
            <SearchEngine />
            {getButtonName}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
