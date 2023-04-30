import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../../context/appContext";
import InputBase from "@mui/material/InputBase";

export const SearchComponent = () => {
  const { t } = useTranslation();
  const { setFilter } = useContext(AppContext);
  const handleSearch = (a) => setFilter(a.target.value);

  const labelTextField = t("app.search.label");

  return (
    <Box sx={{ ml: 1, mr: 2 }}>
      <TextField
        size="small"
        label={labelTextField}
        placeholder={t("app.search.placeholder")}
        onChange={handleSearch}
      />
    </Box>
  );
};
