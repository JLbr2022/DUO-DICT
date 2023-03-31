import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sentences from "./components/Sentences/Sentences";
import DisplayAllWords from "./components/DisplayAllWords/DisplayAllWords";
import ModalCrud from "./components/Crud/ModalCrud/ModalCrud";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { AppContext } from "./components/context/appContext";
import { useStore } from "./components/context/userStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const store = useStore();

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
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}
