import { useContext } from "react";
import { Table } from "react-bootstrap";
import { AppContext } from "../context/appContext";

export default function DisplayAllWords() {
  const { words } = useContext(AppContext);

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
          </tr>
        </thead>
        <tbody>
          {words?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.language}</td>
              <td>{item.word}</td>
              <td>{item.translate}</td>
              <td>{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
