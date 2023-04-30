import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AppContext } from "../../../context/appContext";
import { languages } from "../../../context/userStore";

const initialState = {
  user: "José",
  language: "",
  word: "",
  translate: "",
  comment: "",
};

export const ModalAdd = () => {
  const { t } = useTranslation();
  const { showAdd, setShowAdd, postWord, isWord } = useContext(AppContext);
  const [editWord, setEditWord] = useState({ ...initialState });
  const open = showAdd;
  const type = isWord ? "word" : "sentence";
  const close = () => setShowAdd(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditWord({ ...editWord, [name]: value });
  };

  const handleClose = () => close();

  const handleSubmit = async (e) => {
    e.preventDefault();
    postWord(editWord);
    close();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{t("app.action.add.title", { type })}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
        >
          <TextField
            required
            select
            fullWidth
            id="language"
            name="language"
            label={t("app.labels.language")}
            helperText={t("app.helpers.selectLanguage")}
            value={editWord.language || ""}
            onChange={handleChange}
            variant="filled"
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            fullWidth
            id="word"
            name="word"
            label={type}
            helperText={t("app.helpers.edit.word", { type })}
            value={editWord.word || ""}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            required
            fullWidth
            id="translate"
            name="translate"
            label={t("app.labels.translation")}
            helperText={t("app.helpers.translation")}
            value={editWord.translate || ""}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            required
            fullWidth
            id="comment"
            name="comment"
            label={t("app.labels.comment")}
            helperText={t("app.helpers.comment")}
            value={editWord.comment || ""}
            onChange={handleChange}
            variant="filled"
            multiline
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("app.action.cancel")}</Button>
        <Button onClick={handleSubmit}>{t("app.action.submit")}</Button>
      </DialogActions>
    </Dialog>
  );
};
