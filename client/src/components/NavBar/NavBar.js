import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useState } from "react";

import DisplayAllWords from "../DisplayAllWords/DisplayAllWords";
import AddWord from "../Crud/AddWord/AddWord";
import Sentences from "../Sentences/Sentences";

function NavBar() {
  const [show, setShow] = useState(false);
  const [words, setWords] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchWord = async () => {
    const response = await fetch("http://localhost:4000/words");
    const data = await response.json();
    setWords(data);
  };

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">Duo_Dict</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/DisplayAllWords">Word list</Nav.Link>
              <Nav.Link href="/Sentences">Sentences list</Nav.Link>
            </Nav>
            <Button variant="primary" onClick={handleShow}>
              Add Record
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AddWord show={show} handleClose={handleClose} fetchWord={fetchWord} />

      <Routes>
        <Route
          path="/DisplayAllWords"
          element={<DisplayAllWords fetchWord={fetchWord} />}
        />
        <Route path="/Sentences" element={<Sentences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavBar;
