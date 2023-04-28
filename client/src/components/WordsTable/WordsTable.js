import React, { useState, useContext, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Delete,
  Save,
  KeyboardArrowDown,
  KeyboardArrowUp,
  TableRows,
} from "@mui/icons-material";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
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
  const [openId, setOpenId] = useState(-1);
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

  // Function to handle Edit and show Edit Modal
  const handleEdit = (word) => {
    setSelectedWord(word);
    setShowEdit(true);
  };

  // Function to Delete and show Toast
  const doDelete = () => {
    deleteWord();
    setToast({
      severity: Severity.success,
      message: t("app.messages.deleted"),
    });
  };

  // Function to handle Delete and show Confirm Modal
  const handleDelete = (word) => {
    setSelectedWord(word);
    setConfirm({
      title: t("app.action.delete.title", { word: word.word }),
      text: t("app.action.delete.text"),
      callback: doDelete,
      severity: Severity.info,
    });
  };

  // Virtuoso Component used to render the table and improve performance
  const VirtuosoTableComponents = {
    Scroller: forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} sx={{ tableLayout: "fixed" }} />,
    TableHead,
    TableRow: ({ item: item, ...props }) => (
      <MyTableRow item={item} props={props} />
    ),
    TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const MyTableRow = ({ item, props }) => {
    const index = props["data-index"];
    if (open === index) {
      return (
        <>
          <TableRow {...props} />
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ paddingLeft: "2rem", paddingRight: "2rem" }}
            >
              <TableContainer component={Paper} elevation={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>translate</TableCell>
                      <TableCell>comment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{item.translate}</TableCell>
                      <TableCell>{item.comment}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
        </>
      );
    }
    return <TableRow {...props} />;
  };

  const headerContent = () => (
    <TableRow>
      <TableCell
        sx={{
          display: { sm: "table-cell", xs: "table-cell", md: "none" },
          backgroundColor: "#000",
        }}
      >
        **
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          backgroundColor: "#000",
        }}
      >
        {t("app.headerTable.id")}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          backgroundColor: "#000",
        }}
      >
        {t("app.headerTable.type")}
      </TableCell>
      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          backgroundColor: "#000",
        }}
      >
        {t("app.headerTable.language")}
      </TableCell>

      <TableCell sx={{ maxWidth: 200, backgroundColor: "#000" }}>
        <Box sx={{ padding: "1rem" }}>
          {isWord ? t("app.headerTable.word") : t("app.headerTable.sentence")}
        </Box>
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          backgroundColor: "#000",
          maxWidth: 200,
        }}
      >
        {t("app.headerTable.translation")}
      </TableCell>

      <TableCell
        sx={{
          display: { sm: "none", xs: "none", md: "table-cell" },
          backgroundColor: "#000",
          maxWidth: 200,
        }}
      >
        {t("app.headerTable.comment")}
      </TableCell>
      <TableCell sx={{ backgroundColor: "#000" }}>
        {t("app.headerTable.controls")}
      </TableCell>
    </TableRow>
  );

  const rowContent = (index, item) => {
    const currentOpen = item.id === openId && open > -1;
    const borderBottom = currentOpen
      ? "none"
      : "1px solid rgba(81, 81, 81, 1);";
    return (
      <>
        <TableCell
          sx={{
            display: {
              sm: "table-cell",
              xs: "table-cell",
              md: "none",
              borderBottom,
            },
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(open === index ? -1 : index);
              setOpenId(item.id);
            }}
          >
            {open === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
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

        <TableCell
          sx={{ display: { sm: "none", xs: "none", md: "table-cell" } }}
        >
          {item.language}
        </TableCell>

        <TableCell
          sx={{
            maxWidth: 200,
            borderBottom,
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

        <TableCell sx={{ minWidth: 120, borderBottom }}>
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
  };

  return (
    <>
      <TableVirtuoso
        data={filteredDictionary}
        components={VirtuosoTableComponents}
        fixedHeaderContent={headerContent}
        itemContent={rowContent}
        style={{
          height: "calc(100vh - 100px)",
        }}
      />
      <ModalEdit />
      <ModalConfirm callBack={doDelete} />
    </>
  );
};
