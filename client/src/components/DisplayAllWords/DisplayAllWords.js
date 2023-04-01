import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppContext } from "../context/appContext";
import { Delete, Save } from "@mui/icons-material/";
import { Button, Container } from "@mui/material";
import "./DisplayAllWords.css";
import { useLocation } from "react-router-dom";

export default function DisplayAllWords() {
  const location = useLocation();
  const isWord = location.pathname.includes("/words/w");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { words, getWords, getSentences, deleteWord, deleteSentence } =
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
        rows={words}
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
              <Button onClick={() => handleEdit(word)}>
                <Save color="primary" />
              </Button>
            ),
          },
          {
            field: "delete",
            headerName: "Delete",
            minWidth: 60,
            renderCell: (word) => (
              <Button onClick={() => handleDelete(word)}>
                <Delete color="error" />
              </Button>
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
