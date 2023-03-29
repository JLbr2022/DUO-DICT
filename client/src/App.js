import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Sentences from "./components/Sentences/Sentences";
import DisplayAllWords from "./components/DisplayAllWords/DisplayAllWords";
import ModalCrud from "./components/Crud/ModalCrud/ModalCrud";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

export default function App() {
  // const wordPath = "/words/w/word/asc";

  return (
    <AppContext.Provider value={store}>
      <Container fluid>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words/w/word/asc" element={<DisplayAllWords />} />
          <Route path="/words/s/word/asc" element={<Sentences />} />
        </Routes>
      </Container>
      <ModalCrud />
    </AppContext.Provider>
  );
}
