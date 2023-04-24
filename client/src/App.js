import { Routes, Route } from "react-router-dom";
import { useStore } from "./context/userStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Toast } from "./components/Toast/Toast";
import { WordsTable } from "./components/WordTable/WordsTable";
import { AppContext } from "./context/appContext";
import { ModalAdd } from "./components/Crud/ModalAdd/ModalAdd";

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
              <Route path="/words/w/word/asc" element={<WordsTable />} />
              <Route path="/words/s/word/asc" element={<WordsTable />} />
            </Routes>
          </Container>
          <ModalAdd />
          <Toast />
        </AppContext.Provider>
      </ThemeProvider>
    </Box>
  );
}
