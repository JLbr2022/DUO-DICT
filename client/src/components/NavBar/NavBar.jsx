import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log({location})
  
  const handleShow = () => {
    navigate("/words/add");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">Duo_Dict</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Words">Word list</Nav.Link>
              <Nav.Link href="/Sentences">Sentences list</Nav.Link>
            </Nav>
            <Button variant="primary" onClick={handleShow}>
              Add Word
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}