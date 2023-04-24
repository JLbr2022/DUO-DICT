import { useContext, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Delete, Save } from "@mui/icons-material";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
// import { TableVirtuoso } from "react-virtuoso";
import { AppContext } from "../../context/appContext";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { ModalEdit } from "../Crud/ModalEdit/ModalEdit";
import { Severity } from "../../context/userStore";
import { TableVirtuoso } from "react-virtuoso";

export const WordsTable = () => {
  const { t } = useTranslation();
  const {
    filteredDictionary,
    setToast,
    setSelectedWord,
    deleteWord,
    setConfirm,
    setShowEdit,
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
    Table: (props) => <Table {...props} />,
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
      <TableCell>ID</TableCell>
      <TableCell>TYPE</TableCell>
      <TableCell>LANGUAGE</TableCell>
      <TableCell>WORD</TableCell>
      <TableCell>TRANSLATION</TableCell>
      <TableCell>COMMENTS</TableCell>
      <TableCell>CONTROLS</TableCell>
    </TableRow>
  );

  const rowContent = (_index, item) => (
    <>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.language}</TableCell>
      <TableCell>{item.word}</TableCell>
      <TableCell>{item.translate}</TableCell>
      <TableCell>{item.comment}</TableCell>
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
