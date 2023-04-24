import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material/";
import { Tooltip, IconButton, Box } from "@mui/material";
import styled from "@emotion/styled";
import "./DisplayAllWords.css";

export default function DisplayAllWords() {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line
  const [word, setWord] = useState({});

  const {
    getWords,
    filterWords,
    deleteWord,
    setSelectedWord,
    showEdit,
    setShowEdit,
  } = useContext(AppContext);

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
      window.alert("Word [ " + wrd + " ] was deleted!");
      getWords();
    } else {
      window.alert("Word [ " + wrd + " ] not deleted!");
    }

    // PREGUNTAR POR QUÉ NO FUNCIONA PONER 2 FUNCIONES PARA EJECUTARSE JUNTAS
    // isDelete
    //   ? (deleteWord(word.id), getWords())
    //   : window.alert("Word " + p + " not deleted!");
  };

  // Function to handle edit button which shows an alert with the word and id
  const handleEdit = (word) => {
    setShowEdit(true);
    setSelectedWord(word.row);
  };

  const boxParams = {
    height: 500,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
    borderRadius: 2,
  };

  return (
    <Box sx={boxParams}>
      <DataGrid
        display="flex"
        responsive="true"
        components={{
          Toolbar: () => {
            return (
              <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
                <GridToolbarColumnsButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            );
          },
        }}
        marginLeft="auto"
        marginRight="auto"
        stickyHeader="true"
        hover="true"
        rows={filterWords}
        columns={[
          {
            field: "id",
            headerName: "ID",
            hide: true,
            editable: false,
          },
          {
            field: "type",
            headerName: "Type",
            editable: false,
            // width: 50,
            // flex: 0.5,
          },
          {
            field: "language",
            headerName: "Lang",
            editable: false,
            // width: 50,
            // flex: 0.5,
            hide: { xs: true, sm: true },
          },
          {
            field: "word",
            headerName: "Word",
            editable: false,
            width: 200,
            // flex: 1,
          },
          {
            field: "translate",
            headerName: "Translate",
            editable: false,
            width: 200,
            // flex: 1,
          },
          {
            field: "comment",
            headerName: "Comment",
            editable: false,
            width: 200,
            // flex: 1,
          },
          {
            field: "edit",
            headerName: "Edit",
            width: 50,
            sortable: false,
            disableColumnMenu: true,
            // flex: 1,
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
            sortable: false,
            disableColumnMenu: true,
            // flex: 1,
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
      />
    </Box>
  );
}
