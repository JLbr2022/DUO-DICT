import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppContext } from "../context/appContext";
import { Delete, Save } from "@mui/icons-material/";
import { Tooltip, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import "./DisplayAllWords.css";
import { useLocation } from "react-router-dom";
import "../../components/NavBar/NavBar";

export default function DisplayAllWords() {
  const location = useLocation();
  const isWord = location.pathname.includes("/words/w");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { filterWords, getWords, getSentences, deleteWord, deleteSentence } =
    useContext(AppContext);

  // FUNCTION TO CHANGE THE PAGE IN PAGINATION
  const handlePageChange = (params) => {
    setPage(params.page);
  };

  // FUNCTION TO CHANGE THE QUANTITY OF ROWS TO SHOW IN PAGINATION
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleEdit = (word) => {
    window.alert(
      "Editing word: " + word.row.word + ", with id: " + word.row.id
    );

    console.log(word);
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

  // function to handle delete button which deletes the word or sentence
  const handleDelete = (word) => {
    if (isWord) {
      deleteWord(word.id);
      getWords();
    } else {
      deleteSentence(word.id);
      getSentences();
    }
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
    </div>
  );
}
