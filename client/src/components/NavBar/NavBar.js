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
import DdAvatar from "../../images/parrotLogo.svg";

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
  StAvatar: styled(Avatar)(({ theme }) => ({
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#000",
    border: "2px solid lightgreen",
    borderLeft: "none",
    borderRight: "none",
    justifyContent: "center",
    alignItems: "center",
  })),
  StTitle: styled(Button)(({ theme }) => ({
    color: "#fff",
    marginRight: "auto",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Jokerman",
  })),
};

const Logo = () => (
  <img alt="DuoDict Logo" height={30} width={30} src={DdAvatar} />
);

const LinksNavBar = ({ navigationLinks }) => (
  <>
    {navigationLinks.map((link) => (
      <ListItem key={link.label}>
        <Link
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
  </>
);

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const { setShowAdd, isWord, isSentence } = useContext(AppContext);
  const handleShow = () => setShowAdd(true);
  const navItems = [t("app.menu.wordsList"), t("app.menu.sentencesList")];
  const showAddButton = isWord || isSentence;
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigationLinks = [
    { label: t("app.menu.wordsList"), to: wordsURL },
    { label: t("app.menu.sentencesList"), to: sentencesURL },
  ];

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <IconButton
              size="large"
              // edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                display: { xs: "block", sm: "flex", md: "none" },
                mr: 1.5,
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <StyledComponents.StAvatar // AVATAR LOGO
              component={RouterLink}
              to="/"
              alt="DuoDict Logo"
              sx={{
                width: 40,
                height: 40,
                display: { xs: "none", sm: "flex", md: "flex" },
              }}
              size="large"
            >
              <Logo />
            </StyledComponents.StAvatar>

            <StyledComponents.StTitle // TITLE
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                textDecoration: "none",
              }}
            >
              {t("app.title")}
            </StyledComponents.StTitle>

            <List // NAVIGATION LINKS
              spacing={4}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  width: "300px",
                },
              }}
            >
              <LinksNavBar navigationLinks={navigationLinks} />
            </List>
            {!showAddButton || (
              <Box>
                <SearchComponent />
              </Box>
            )}
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
          <IconButton
            onClick={() => setOpenDrawer(false)}
            sx={{ justifyContent: "flex-end" }}
          >
            <ChevronLeft />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          <LinksNavBar navigationLinks={navigationLinks} />
        </List>
      </SwipeableDrawer>
    </Box>
  );
}
