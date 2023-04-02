import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

export default function DoDelete() {
  const { getWords, getSentences, deleteWord, deleteSentence } =
    useContext(AppContext);
  // function to handle delete button which deletes the word or sentence
  const handleDelete = (word) => {
    if (isWord) {
      deleteWord(word.id);
      getWords();
    } else {
      deleteSentence(word.id);
      getSentences();
    }
  };
  return;
}
