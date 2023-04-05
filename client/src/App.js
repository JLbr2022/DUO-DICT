import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AppContext } from "./components/context/appContext";
import { useStore } from "./components/context/userStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Sentences from "./components/Sentences/Sentences";
import ModalCrud from "./components/Crud/ModalCrud/ModalCrud";
// import ModalDelete from "./components/Crud/ModalDelete/ModalDelete";
import DisplayAllWords from "./components/DisplayAllWords/DisplayAllWords";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const store = useStore();
  const [word, setWord] = useState(useContext(AppContext));
  // console.log(word);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
          {/* <ModalDelete word={word} /> */}
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}
