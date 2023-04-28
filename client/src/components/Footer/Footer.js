import React, { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";

export function Footer() {
  const { i18n } = useTranslation();
  const storedLang = localStorage.getItem("lang"); // Get stored language
  const [language, setLanguage] = useState(storedLang || "en"); // Set language

  function handleLanguage(event) {
    const lang = event.target.value;
    i18n.changeLanguage(lang).then(() => {
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        width: "100%",
        height: "60px",
        backgroundColor: "#272727",
        color: "#fff",
        position: "fixed",
        bottom: 0,
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select value={language} onChange={handleLanguage}>
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="es">ES</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
