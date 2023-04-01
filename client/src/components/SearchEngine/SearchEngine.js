// import { Search } from "@mui/icons-material";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

export default function SearchEngine() {
  const { words, sentences, applyFilter, isWord, isSentence } =
    useContext(AppContext);
  const handleSearch = (value) => {
    // console.log(value);
    const data = isSentence() ? sentences : words;
    applyFilter(value, data);
  };

  const getSearchField = isWord() ? (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search word..."
        className="me-5"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </Form>
  ) : isSentence() ? (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search sentence..."
        className="me-5"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </Form>
  ) : null;
  return getSearchField;
}
