import * as React from "react";
import { AppContext } from "../context/appContext";
import { useStore } from "../context/userStore";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  AppBar,
  Box,
  Stack,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Typography,
  Grid,
  Link,
} from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const { isWord, isSentence } = useStore(AppContext);
  const { t } = useTranslation();
  const wordsURL = "http://localhost:3000/words/w/word/asc";
  const sentencesURL = "http://localhost:3000/words/s/word/asc";

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
              sx={{ display: { xs: "none", sm: "block" } }}
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
                  href={
                    item === t("app.menu.wordsList") ? wordsURL : sentencesURL
                  }
                  key={item}
                  sx={{ color: "#fff" }}
                >
                  {item}
                </Button>
              ))}
              {/* {navItems.map((item) => (
                <Button href={} key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))} */}
            </Stack>
            <Box
              sx={
                {
                  // display: { xs: 1 },
                }
              }
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
