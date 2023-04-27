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
import styled from "@emotion/styled";

const wordsURL = "/words/w/word/asc";
const sentencesURL = "/words/s/word/asc";

const StyledComponents = {
  StIconHamberger: styled(IconButton).attrs(({ theme }) => ({
    size: "large",
    edge: "start",
    color: "inherit",
    sx: {
      display: { xs: "block", sm: "block", md: "none" },
      mr: 2,
    },
  })),

  StAvatar: styled(Avatar)(({ theme }) => ({
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#000",
    sx: {
      display: { xs: "block", sm: "block", md: "none" },
      textDecoration: "none",
    },
  })),
  StTitle: styled(Button)(({ theme }) => ({
    color: "#fff",
    marginRight: "auto",
    sx: {
      display: { xs: "none", sm: "none", md: "block" },
      textDecoration: "none",
    },
  })),
};

export default function NavBar() {
  const { t } = useTranslation();
  const { setShowAdd, isWord, isSentence } = useContext(AppContext);
  const handleShow = () => setShowAdd(true);
  const navItems = [t("app.menu.wordsList"), t("app.menu.sentencesList")];
  const showAddButton = isWord || isSentence;

  const NavigationLinks = [
    { label: t("app.menu.wordsList"), to: wordsURL },
    { label: t("app.menu.sentencesList"), to: sentencesURL },
  ];

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <StyledComponents.StIconHamberger // MENU HAMBURGER ICON
              aria-label="open drawer"
            >
              <MenuIcon />
            </StyledComponents.StIconHamberger>

            <StyledComponents.StAvatar // AVATAR LOGO
              component={RouterLink}
              to="/"
            >
              DD
            </StyledComponents.StAvatar>

            <StyledComponents.StTitle // TITLE
              component={RouterLink}
              to="/"
            >
              {t("app.title")}
            </StyledComponents.StTitle>

            <Stack // NAVIGATION LINKS
              direction="row"
              spacing={4}
              sx={{
                display: { xs: "none", sm: "none", md: "table-cell" },
              }}
            >
              {NavigationLinks.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    display: "row",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
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
