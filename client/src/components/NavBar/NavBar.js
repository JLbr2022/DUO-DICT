import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#words">Word list</Nav.Link>
          <Nav.Link href="#sentences">Sentences list</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
