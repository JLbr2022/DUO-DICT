import * as React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { AppContext } from "../../context/appContext";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  AppBar,
  Box,
  Stack,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Grid,
  Fab,
  Link,
} from "@mui/material";

const wordsURL = "/words/w/word/asc";
const sentencesURL = "/words/s/word/asc";

export default function NavBar() {
  const { t } = useTranslation();
  const { setShowAdd, isWord, isSentence } = useContext(AppContext);
  const handleShow = () => setShowAdd(true);
  const navItems = [t("app.menu.wordsList"), t("app.menu.sentencesList")];
  const showAddButton = isWord || isSentence;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Avatar
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "none", md: "flex" },
                textDecoration: "none",
              }}
            >
              Ddc
            </Avatar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                mr: 2,
                display: { sx: "none", sm: "flex", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              <h3 sx={{ textDecoration: "none" }}>{t("app.title")}</h3>
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", sm: "none", md: "table-cell" },
              }}
            >
              {navItems.map((item) => (
                <Button
                  to={
                    item === t("app.menu.wordsList") ? wordsURL : sentencesURL
                  }
                  key={item}
                  component={RouterLink}
                  sx={{ color: "#fff" }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
            <Box>
              <SearchComponent />
            </Box>
          </Grid>
          {showAddButton && (
            <Fab size="small" aria-label="add" onClick={handleShow}>
              <AddIcon />
            </Fab>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
