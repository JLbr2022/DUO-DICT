import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddWord from "../Crud/AddWord/AddWord";

function DisplayAllWords({ onAddWord }) {
  const [words, setWords] = useState([]);

  // create a fetch function
  const fetchWords = async () => {
    const response = await fetch("http://localhost:4000/words");
    const data = await response.json();
    setWords(data);
  };

  // call the fetch function
  useEffect(() => {
    fetchWords();
  }, []);

  // add a new word to the table
  const handleAddWord = () => {
    // call the fetchWords function to get the updated data
    fetchWords();
  };

  // display the data

  return (
    <>
      <AddWord onAddWord={handleAddWord} />
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
    </>
  );
}

export default DisplayAllWords;
