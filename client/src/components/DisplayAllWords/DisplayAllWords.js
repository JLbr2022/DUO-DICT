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

  const handleEdit = () => {
    window.alert("edit");

    console.log("edit");
  };

  // function to handle delete button which deletes the word or sentence
  const handleDelete = (id) => {
    if (isWord) {
      deleteWord(id);
      getWords();
    } else {
      deleteSentence(id);
      getSentences();
    }
  };

  return (
    // <div className="containerDataGrid" height="500px" width="100%">
    <div className="containerDataGrid">
      <DataGrid
        rows={words}
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "type", headerName: "Type", width: 90, editable: true },
          {
            field: "language",
            headerName: "Language",
            width: 90,
            editable: true,
          },
          { field: "word", headerName: "Word", width: 230, editable: true },
          {
            field: "translate",
            headerName: "Translate",
            width: 230,
            editable: true,
          },
          {
            field: "comment",
            headerName: "Comment",
            width: 230,
            editable: true,
          },
          {
            field: "edit",
            headerName: "Edit",
            width: 60,
            renderCell: () => (
              <Button onClick={handleEdit}>
                <Save />
              </Button>
            ),
          },
          {
            field: "delete",
            headerName: "Delete",
            width: 150,
            renderCell: () => (
              <Button onClick={() => handleDelete(words.id)}>
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
