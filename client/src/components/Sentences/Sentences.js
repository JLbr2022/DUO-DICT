import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Delete, Save } from "@mui/icons-material/";
import { AppContext } from "../context/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sentences.css";

export default function Sentences() {
  const { sentences } = useContext(AppContext);

  const handleEdit = () => {
    console.log("edit");
    toast.success("Saving changes...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleDelete = () => {
    toast.error("Deleting word...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.log("delete");
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
            <th>LANGUAGE</th>
            <th>WORD</th>
            <th>TRANSLATION</th>
            <th>COMMENTS</th>
            <th>CONTROLS</th>
          </tr>
        </thead>
        <tbody>
          {sentences?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.language}</td>
              <td>{item.word}</td>
              <td>{item.translate}</td>
              <td>{item.comment}</td>
              <td className="ControlIcons">
                <Save onClick={handleEdit} />
                <Delete onClick={handleDelete} />
                <ToastContainer />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
