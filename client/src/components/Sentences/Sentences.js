import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { Delete, Edit } from "@mui/icons-material/";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  // TablePagination,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
// import "react-toastify/dist/ReactToastify.css";

export default function Sentences() {
  const {
    filterSentences,
    deleteSentence,
    setSelectedSentence,
    showEdit,
    handleEdit,
    handleDelete,
  } = useContext(AppContext);

  // CREATE A CUSTOM TOOLTIP TO SHOW IT WHEN HOVER UP DELETE/EDIT BUTTONS
  const DarkBgbTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    "& .MuiTooltip-tooltip": {
      backgroundColor: theme.palette.common.black,
      fontSize: 16,
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
      <TableContainer
      // sx={{ maxHeight: 440 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Lang</TableCell>
              <TableCell>Sentence</TableCell>
              <TableCell>Translation</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterSentences.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.language}</TableCell>
                <TableCell>{item.word}</TableCell>
                <TableCell>{item.translate}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>
                  <DarkBgbTooltip title="Edit sentence">
                    <IconButton onClick={() => handleEdit(item)}>
                      <Edit color="primary" />
                    </IconButton>
                  </DarkBgbTooltip>
                </TableCell>
                <TableCell>
                  <DarkBgbTooltip title="Delete Sentence">
                    <IconButton onClick={() => handleDelete(item)}>
                      <Delete color="secondary" />
                    </IconButton>
                  </DarkBgbTooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filterSentences.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
