import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Save } from "@mui/icons-material/";
import { Tooltip, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { AppContext } from "../context/appContext";
import "./DisplayAllWords.css";
import "../../components/NavBar/NavBar";
// import ModalDelete from "../Crud/ModalDelete/ModalDelete";

export default function DisplayAllWords() {
  const [pageSize, setPageSize] = useState(5);
  const [word, setWord] = useState("");
  const [page, setPage] = useState(0);
  const { filterWords } = useContext(AppContext);
  const { deleteWord, deleteSentence, getWords, getSentences } =
    useContext(AppContext);

  // FUNCTION TO CHANGE THE PAGE IN PAGINATION
  const handlePageChange = (params) => {
    setPage(params.page);
  };

  // FUNCTION TO CHANGE THE QUANTITY OF ROWS TO SHOW IN PAGINATION
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  // CREATE A CUSTOM TOOLTIP TO SHOW IT WHEN HOVER UP DELETE/EDIT BUTTONS
  const DarkBgbTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    "& .MuiTooltip-tooltip": {
      backgroundColor: theme.palette.common.black,
      fontSize: 16,
    },
  }));

  // function to handle delete words or sentences
  const handleDelete = (word) => {
    setWord(word);
    console.log(word.row.word);
    const wrd = word.row.word;
    const isDelete = window.confirm("Deleting word: " + wrd);

    if (isDelete) {
      deleteWord(word.id);
      getWords();
      window.alert("Word [ " + wrd + " ] was deleted!");
    } else {
      window.alert("Word [ " + wrd + " ] not deleted!");
    }

    // isDelete
    //   ? (deleteWord(word.id), getWords())
    //   : window.alert("Word " + p + " not deleted!");
  };

  // Function to handle edit button which shows an alert with the word and id
  const handleEdit = (word) => {
    window.alert(
      "Editing word: " +
        word.row.word +
        " Editing translation: " +
        word.row.translate +
        " , ID: " +
        word.row.id
    );

    console.log(word);
  };

  return (
    // <div className="containerDataGrid" height="500px" width="100%">
    <div className="containerDataGrid">
      <DataGrid
        stickyHeader="true"
        hover="true"
        rows={filterWords}
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "type", headerName: "Type", minWidth: 90, editable: false },
          {
            field: "language",
            headerName: "Language",
            minWidth: 20,
            editable: false,
          },
          { field: "word", headerName: "Word", minWidth: 300, editable: false },
          {
            field: "translate",
            headerName: "Translate",
            minWidth: 300,
            editable: false,
          },
          {
            field: "comment",
            headerName: "Comment",
            minWidth: 300,
            editable: false,
          },
          {
            field: "edit",
            headerName: "Edit",
            minWidth: 60,
            renderCell: (word) => (
              <DarkBgbTooltip title="Edit word">
                <IconButton onClick={() => handleEdit(word)}>
                  <Save color="primary" />
                </IconButton>
              </DarkBgbTooltip>
            ),
          },
          {
            field: "delete",
            headerName: "Delete",
            minWidth: 60,
            renderCell: (word) => (
              <DarkBgbTooltip title="Delete word">
                <IconButton onClick={() => handleDelete(word)}>
                  <Delete color="error" />
                </IconButton>
              </DarkBgbTooltip>
            ),
          },
        ]}
        pageSize={pageSize}
        page={page}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        // checkboxSelection
      />
      {/* <ModalDelete word={word} /> */}
    </div>
  );
}
