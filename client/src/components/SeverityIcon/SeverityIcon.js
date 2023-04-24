import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../../context/appContext";
import InputBase from "@mui/material/InputBase";

export const SeverityIcon = () => {
  const { t } = useTranslation();
  const { setFilter } = useContext(AppContext);
  const handleSearch = (a) => setFilter(a.target.value);

  return (
    <Box sx={{ ml: 1 }}>
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder={t("app.search.placeholder")}
        onChange={handleSearch}
      />
    </Box>
  );
};
