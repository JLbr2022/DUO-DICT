import * as React from "react";
import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppContext } from "../context/appContext";
import { Delete, Save } from "@mui/icons-material/";
// import "./DisplayAllWords.css";
import { Button } from "@mui/material";

export default function DisplayAllWords() {
  const { words } = useContext(AppContext);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <DataGrid
      className="DataGridCss"
      style={{
        height: "700px",
        width: "100%",
        // backgroundColor: "grey",
      }}
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
            <Button onClick={handleDelete}>
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
  );
}
