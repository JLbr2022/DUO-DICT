import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useTranslation } from "react-i18next";

export const SearchComponent = () => {
  const { t } = useTranslation();
  const { applyFilter } = useContext(AppContext);

  const handleSearch = (a) => applyFilter(a.target.value);

  return (
    <>
      <InputBase
        sx={{ ml: 2 }}
        placeholder={t("app.search.placeholder")}
        onChange={handleSearch}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
};
