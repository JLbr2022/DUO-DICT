import { Routes, Route } from "react-router-dom";
import { AppContext } from "./components/context/appContext";
import { useStore } from "./components/context/userStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Sentences from "./components/Sentences/Sentences";
import ModalAdd from "./components/Crud/ModalAdd/ModalAdd";
import DisplayAllWords from "./components/DisplayAllWords/DisplayAllWords";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const store = useStore();

  return (
    <Box flex justifyContent="center" alignItems="center" width="100%">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppContext.Provider value={store}>
          <Container>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/words/w/word/asc" element={<DisplayAllWords />} />
              <Route path="/words/s/word/asc" element={<Sentences />} />
            </Routes>
          </Container>
          <ModalAdd />
        </AppContext.Provider>
      </ThemeProvider>
    </Box>
  );
}
