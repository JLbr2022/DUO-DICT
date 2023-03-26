import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("LocationNAVBAR"+{location})
  
  const handleShowWord = () => {
    navigate("/words/type/w/add");
  };
  
  const handleShowSentences = () => {
    navigate("/words/add/type/s");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">Duo_Dict</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/words/type/w">Word list</Nav.Link>
              <Nav.Link href="/words/type/s">Sentences list</Nav.Link>
            </Nav>
            {(location.pathname === "/words/type/w" || location.pathname === "/add") && (
              <Button variant="primary" href="/words/type/add" onClick={handleShowWord}>
                Add Word
              </Button>
            )}
            {location.pathname === "/words/type/s" && (
              <Button variant="primary" href="/words/type/s/add" onClick={handleShowSentences}>
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