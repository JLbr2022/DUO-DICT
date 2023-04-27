import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronLeft } from "@mui/icons-material";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { AppContext } from "../../context/appContext";
import { Link as RouterLink } from "react-router-dom";
import styled from "@emotion/styled";

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
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
} from "@mui/material";

const wordsURL = "/words/w/word/asc";
const sentencesURL = "/words/s/word/asc";

const StyledComponents = {
  StIconHamberger: styled(IconButton)(({ theme }) => ({
    size: "large",
    edge: "start",
    color: "inherit",
    sx: {
      display: { xs: "block", sm: "block", md: "none" },
    },
  })),

  StAvatar: styled(Avatar)(({ theme }) => ({
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#000",
    border: "2px solid white",
    borderLeft: "none",
    borderRight: "none",
    marginRight: 10,
    sx: {
      display: { xs: "block", sm: "block", md: "none" },
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
  const [openDrawer, setOpenDrawer] = useState(false);

  const NavigationLinks = [
    { label: t("app.menu.wordsList"), to: wordsURL },
    { label: t("app.menu.sentencesList"), to: sentencesURL },
  ];

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            {/* <StyledComponents.StIconHamberger // MENU HAMBURGER ICON
              aria-label="open drawer"
            >
              <MenuIcon />
            </StyledComponents.StIconHamberger> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                mr: 1.5,
              }}
            >
              <MenuIcon onClick={() => setOpenDrawer(true)} />
            </IconButton>

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
      <SwipeableDrawer // DRAWER
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
      >
        <Stack>
          <IconButton sx={{ justifyContent: "flex-end" }}>
            <ChevronLeft onClick={() => setOpenDrawer(false)} />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {NavigationLinks.map((link) => (
            <ListItem>
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
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </Box>
  );
}
