import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function DisplayAllWords() {
  const location = useLocation();
  const [words, setWords] = useState([]);

  // create a fetch function
  const fetchWords = async () => {
    const response = await fetch(`${serverUrl}words`);
    const data = await response.json();
    setWords(data);
  };

  // call the fetch function
  useEffect(() => {
    fetchWords();
  }, [location]);
  console.log({location})

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>WORD</th>
            <th>TRANSLATION</th>
            <th>COMMENTS</th>
          </tr>
        </thead>
        <tbody>
          {words?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.word}</td>
              <td>{item.translate}</td>
              <td>{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Outlet />
    </>
  );
}