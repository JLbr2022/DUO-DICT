import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import { AppContext } from "../../context/appContext";
import { Close } from "@mui/icons-material";
import { SeverityIcon } from "../SeverityIcon/SeverityIcon";

export const Toast = () => {
  const { toast, clearToast } = useContext(AppContext);
  const open = toast.message !== undefined;

  useEffect(() => {
    if (toast.message) {
      setTimeout(clearToast, 3000);
    }
  }, [toast.message, clearToast, toast.action]);

  const content = toast.message ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: 250,
      }}
    >
      <SeverityIcon severity={toast.severity} />
      <div>{toast.message}</div>
      <Close
        onClick={clearToast}
        sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
      />
    </Box>
  ) : null;

  return (
    <Snackbar
      open={open}
      onClose={clearToast}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      message={content}
    ></Snackbar>
  );
};
