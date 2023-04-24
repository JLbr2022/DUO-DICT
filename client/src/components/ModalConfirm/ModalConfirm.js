import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppContext } from "../../context/appContext";
import { useTranslation } from "react-i18next";
import { SeverityIcon } from "../SeverityIcon/SeverityIcon";

export const ModalConfirm = ({ callBack }) => {
  const { t } = useTranslation();
  const { confirm, clearConfirm } = useContext(AppContext);
  const open = confirm.text !== undefined;
  const handleClose = () => clearConfirm();

  const handleConfirm = () => {
    clearConfirm();
    if (callBack) callBack();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{confirm.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <SeverityIcon icon={confirm.severity} />
          <DialogContentText>{confirm.text}</DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearConfirm}>{t("app.action.cancel")}</Button>
        <Button onClick={handleConfirm}>{t("app.action.confirm")}</Button>
      </DialogActions>
    </Dialog>
  );
};
