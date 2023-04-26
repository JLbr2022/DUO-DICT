import React, { useState, useContext, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Delete,
  Save,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { AppContext } from "../../context/appContext";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { ModalEdit } from "../Crud/ModalEdit/ModalEdit";
import { Severity } from "../../context/userStore";

export const WordsTable = () => {
  const [open, setOpen] = useState(-1);
  const { t } = useTranslation();
  const {
    filteredDictionary,
    setToast,
    setSelectedWord,
    deleteWord,
    setConfirm,
    setShowEdit,
    isWord,
  } = useContext(AppContext);

  const handleEdit = (word) => {
    setSelectedWord(word);
    setShowEdit(true);
  };

  const doDelete = () => {
    deleteWord();
    setToast({
      severity: Severity.success,
      message: t("app.messages.deleted"),
    });
  };

  const VirtuosoTableComponents = {
    Scroller: forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} sx={{ tableLayout: "fixed" }} />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const handleDelete = (word) => {
    setSelectedWord(word);
    setConfirm({
      title: t("app.action.delete.title", { word: word.word }),
      text: t("app.action.delete.text"),
      callback: doDelete,
      severity: Severity.info,
    });
  };

  const headerContent = () => (
    <TableRow>
      <TableCell
        sx={{
          display: { sm: "table-cell", xs: "table-cell", md: "none" },
        }}
      >
        **
      </TableCell>

      <TableCell sx={{ display: { sm: "none", xs: "none", md: "table-cell" } }}>
        {t("app.headerTable.id")}
      </TableCell>

      <TableCell sx={{ display: { sm: "none", xs: "none", md: "table-cell" } }}>
        {t("app.headerTable.type")}
      </TableCell>
      <TableCell sx={{ display: { sm: "none", xs: "none", md: "table-cell" } }}>
        {t("app.headerTable.language")}
      </TableCell>

      <TableCell sx={{ maxWidth: 200 }}>
        <Box sx={{ padding: "1rem" }}>
          {isWord ? t("app.headerTable.word") : t("app.headerTable.sentence")}
        </Box>
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 200,
        }}
      >
        {t("app.headerTable.translation")}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 200,
        }}
      >
        {t("app.headerTable.comment")}
      </TableCell>
      <TableCell>{t("app.headerTable.controls")}</TableCell>
    </TableRow>
  );

  const rowContent = (index, item) => (
    <>
      <TableCell
        sx={{
          display: { sm: "table-cell", xs: "table-cell", md: "none" },
        }}
      >
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(open === index ? -1 : index)}
        >
          {open === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7}>
                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      minHeight: 36,
                      textAlign: "center",
                      alignItems: "center",
                      fontSize: 18,

                      display: { sx: "none", md: "none" },
                      paddingBottom: 0,
                      paddingTop: 0,
                      border: 0,
                    }}
                  >
                    EXPANDED ON index: {index} <br /> WORD: {item.word}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 50,
        }}
      >
        {item.id}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 50,
        }}
      >
        {item.type}
      </TableCell>

      <TableCell sx={{ display: { sm: "none", xs: "none", md: "table-cell" } }}>
        {item.language}
      </TableCell>

      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        {item.word}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 200,
        }}
      >
        {item.translate}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          maxWidth: 200,
        }}
      >
        {item.comment}
      </TableCell>

      <TableCell sx={{ minWidth: 120 }}>
        <IconButton
          color="primary"
          component="label"
          onClick={() => handleEdit(item)}
        >
          <Save />
        </IconButton>
        <IconButton
          color="error"
          component="label"
          onClick={() => handleDelete(item)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </>
  );
  {
  }

  return (
    <>
      <TableVirtuoso
        data={filteredDictionary}
        components={VirtuosoTableComponents}
        fixedHeaderContent={headerContent}
        itemContent={rowContent}
        style={{ height: "calc(100vh - 100px)" }}
      />
      <ModalEdit />
      <ModalConfirm callBack={doDelete} />
    </>
  );
};
