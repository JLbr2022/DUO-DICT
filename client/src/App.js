import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <NavBar />
    </Container>
  );
}

export default App;
