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
} from "@mui/material";

const wordsURL = "/words/w/word/asc";
const sentencesURL = "/words/s/word/asc";

export default function NavBar() {
  const { t } = useTranslation();
  const { setShowAdd } = useContext(AppContext);
  const handleShow = () => setShowAdd(true);
  const navItems = [t("app.menu.wordsList"), t("app.menu.sentencesList")];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Avatar sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}>
              Ddc
            </Avatar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              // noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
            >
              <h3>{t("app.title")}</h3>
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", sm: "block" },
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
          <Fab size="small" aria-label="add" onClick={handleShow}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
