import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import DisplayAllWords from "../DisplayAllWords/DisplayAllWords";
import Sentences from "../Sentences/Sentences";
// import Home from "../Home/Home";

function NavBar(props) {
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/DisplayAllWords" element={<DisplayAllWords />} />
        <Route path="/Sentences" element={<Sentences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavBar;
