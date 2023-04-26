import { useContext, useState, useEffect } from "react";
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

export const ModalEdit = () => {
  const { t } = useTranslation();
  const {
    showEdit,
    setShowEdit,
    selectedWord,
    putWord,
    isWord,
  } = useContext(AppContext);
  const [editWord, setEditWord] = useState({ ...selectedWord });
  const open = showEdit;
  const type = isWord ? "word" : "sentence";
  const close = () => setShowEdit(false);

  useEffect(() => {
    setEditWord(selectedWord);
  }, [selectedWord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditWord({ ...editWord, [name]: value });
  };

  const handleClose = () => close();

  const handleSubmit = async (e) => {
    e.preventDefault();
    putWord(editWord);
    close();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{t("app.action.edit.title", { type })}</DialogTitle>
      <DialogContent fullWidth>
        <Box
          component="form"
          sx={{
            display: "grid",
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete={false}
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
