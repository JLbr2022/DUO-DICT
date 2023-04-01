// This module contain all App's logic control
// to keep the components code clear and easy to understand

import { useEffect, useState } from "react";
import { api } from "./api";
import { useLocation } from "react-router-dom";

export const useStore = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [words, setWords] = useState([]);
  const [filterWords, setFilterWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [filterSentences, setFilterSentences] = useState([]);
  const isWord = () => location.pathname.includes("/words/w");
  const isSentence = () => location.pathname.includes("/words/s");

  const applyFilter = (filter, _array) => {
    const filtered = _array.filter((word) => {
      const a = word.word?.toLowerCase().includes(filter.toLowerCase());
      const b = word.translate?.toLowerCase().includes(filter.toLowerCase());
      return a || b;
    });
    if (isWord()) setFilterWords(filtered);
    if (isSentence()) setFilterSentences(filtered);
  };

  const getWords = () => {
    api.getWords().then((response) => {
      setWords(response.data);
      setFilterWords(response.data);
    });
  };

  const getSentences = () => {
    api.getSentences().then((response) => {
      setSentences(response.data);
      setFilterSentences(response.data);
    });
  };

  const postWord = (payload) => {
    api.postWord(payload);
  };

  const postSentence = (payload) => {
    api.postSentence(payload);
  };

  const deleteWord = (payload) => {
    api.deleteWord(payload);
  };

  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  return {
    words,
    sentences,
    getWords,
    isWord,
    isSentence,
    getSentences,
    postWord,
    postSentence,
    deleteWord,
    show,
    setShow,
    applyFilter,
    filterWords,
    filterSentences,
  };
};
