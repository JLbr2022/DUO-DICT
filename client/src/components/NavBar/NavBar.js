import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/appContext";

export default function NavBar() {
  const location = useLocation();
  const { setShow } = useContext(AppContext);

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
            <Button variant="primary" onClick={handleShow}>
              {isWord ? "Add Word" : "Add Sentence"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
