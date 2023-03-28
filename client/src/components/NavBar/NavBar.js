import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";

// import DisplayAllWords from "../DisplayAllWords/DisplayAllWords";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  // let path = "";
  // const [wordListUrl, setWordListUrl] = useState("");

  const handleShowWord = () => {
    navigate("/words/w/word/asc/add");
  };

  const handleShowSentences = () => {
    navigate("/words/s/word/asc/add");
  };

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
            {(location.pathname === "/words/w/word/asc" ||
              location.pathname === "/add") && (
              <Button
                variant="primary"
                href="/words/w/word/asc/add"
                onClick={handleShowWord}
              >
                Add Word
              </Button>
            )}
            {(location.pathname === "/words/s/word/asc" ||
              location.pathname === "/add") && (
              <Button
                variant="primary"
                href="/words/s/word/asc/add"
                onClick={handleShowSentences}
              >
                Add Sentence
              </Button>
            )}
            {/* <Button variant="primary" onClick={handleShow}>
              Add Word
            </Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
