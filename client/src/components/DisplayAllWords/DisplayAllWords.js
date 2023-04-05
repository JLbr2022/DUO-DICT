import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material/";
import { Tooltip, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import { AppContext } from "../context/appContext";
import "./DisplayAllWords.css";
import "../../components/NavBar/NavBar";
// import ModalDelete from "../Crud/ModalDelete/ModalDelete";

export default function DisplayAllWords() {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [word, setWord] = useState("");
  const { filterWords } = useContext(AppContext);
  const { deleteWord, getWords } = useContext(AppContext);

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
    const wrd = word.row.word;
    const isDelete = window.confirm("Deleting word: [ " + wrd + "  ]");

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
    // <div className="containerDataGrid">
    <Box justifyContent="center" alignItems="center" height="500px">
      <DataGrid
        stickyHeader="true"
        hover="true"
        rows={filterWords}
        columns={[
          {
            field: "id",
            headerName: "ID",
            width: 60,
          },
          {
            field: "type",
            headerName: "Type",
            editable: false,
            width: 50,
          },
          {
            field: "language",
            headerName: "Lang",
            editable: false,
            width: 50,
          },
          {
            field: "word",
            headerName: "Word",
            editable: false,
            width: 250,
          },
          {
            field: "translate",
            headerName: "Translate",
            editable: false,
            width: 250,
          },
          {
            field: "comment",
            headerName: "Comment",
            editable: false,
            width: 250,
          },
          {
            field: "edit",
            headerName: "Edit",
            width: 50,
            renderCell: (word) => (
              <DarkBgbTooltip title="Edit word">
                <IconButton onClick={() => handleEdit(word)}>
                  <Edit color="primary" />
                </IconButton>
              </DarkBgbTooltip>
            ),
          },
          {
            field: "delete",
            headerName: "Del",
            xl: 50,
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
    </Box>
  );
}
