import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { Delete, Edit, Save } from "@mui/icons-material/";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Tooltip, styled } from "@mui/material";

export default function Sentences() {
  const { filterSentences, deleteSentence, setSelectedSentence, setShowEdit } =
    useContext(AppContext);
  const [sentence, setSentence] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
  const handleDelete = (sentence) => {
    setSentence(sentence);
    const wrd = sentence.row.word;
    const isDelete = window.confirm("Deleting word: [ " + wrd + "  ]");

    if (isDelete) {
      deleteSentence(sentence.id);
      window.alert("Word [ " + wrd + " ] was deleted!");
    } else {
      window.alert("Word [ " + wrd + " ] not deleted!");
    }
  };

  // Function to handle edit button which shows an alert with the word and id
  const handleEdit = (sentence) => {
    console.log("handleEdit: ", sentence);
    setShowEdit(true);
    setSelectedSentence(sentence.row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.language}</TableCell>
                <TableCell>{item.word}</TableCell>
                <TableCell>{item.translate}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>
                  <DarkBgbTooltip title="Edit sentence">
                    <IconButton onClick={() => handleEdit(sentence)}>
                      <Edit color="primary" />
                    </IconButton>
                  </DarkBgbTooltip>
                </TableCell>
                <TableCell>
                  <DarkBgbTooltip title="Delete Sentence">
                    <IconButton onClick={() => handleDelete(sentence)}>
                      <Delete color="secondary" />
                    </IconButton>
                  </DarkBgbTooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filterSentences.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
