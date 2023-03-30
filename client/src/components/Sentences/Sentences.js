import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Delete, Save } from "@mui/icons-material/";
import { AppContext } from "../context/appContext";
import "./Sentences.css";

export default function Sentences() {
  const { sentences } = useContext(AppContext);

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
              <tb className="ControlIcons">
                <Save />
                <Delete />
              </tb>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
