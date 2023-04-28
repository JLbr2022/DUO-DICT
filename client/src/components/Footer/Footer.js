import React, { useState } from "react";
import { Button, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState(true);

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleLanguage("en");
        }}
      >
        EN
      </Button>
      <Button
        onClick={() => {
          handleLanguage("es");
        }}
      >
        ES
      </Button>
    </>
  );
}
