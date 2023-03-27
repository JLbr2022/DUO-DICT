import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  let path = "";
  const [wordListUrl, setWordListUrl] = useState("");

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
              <Nav.Link href="/words">Word list</Nav.Link>
              <Nav.Link href="/sentences">Sentences list</Nav.Link>
            </Nav>
            {(location.pathname === "/words" ||
              location.pathname === "/add") && (
              <Button variant="primary" href="/words/add" onClick={handleShow}>
                Add Word
              </Button>
            )}
            {location.pathname === "/sentences" && (
              <Button
                variant="primary"
                href="/sentence"
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
