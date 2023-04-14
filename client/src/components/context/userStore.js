// This module contain all App's logic control and state management
// to keep the components code clean and easy to understand

import { useEffect, useState } from "react";
import { api } from "./api";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useStore = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState({});
  const [selectedSentence, setSelectedSentence] = useState({});
  const [filterWords, setFilterWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [filterSentences, setFilterSentences] = useState([]);

  const isWord = location.pathname.includes("/words/w");
  const isSentence = location.pathname.includes("/words/s");

  const applyFilter = (filter) => {
    const _array = isWord ? words : sentences;
    const filtered = _array.filter((word) => {
      const a = word.word?.toLowerCase().includes(filter.toLowerCase());
      const b = word.translate?.toLowerCase().includes(filter.toLowerCase());
      return a || b;
    });
    if (isWord) {
      setFilterWords(filtered);
    } else {
      setFilterSentences(filtered);
    }
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

  const putWord = (id, payload) => {
    api.putWord(id, payload);
  };

  const putSentence = (id, payload) => {
    api.putSentence(id, payload);
  };

  const deleteWord = (payload) => {
    api.deleteWord(payload);
  };

  const deleteSentence = (payload) => {
    api.deleteSentence(payload);
  };

  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  return {
    applyFilter,
    deleteWord,
    deleteSentence,
    filterWords,
    filterSentences,
    getSentences,
    getWords,
    isWord,
    isSentence,
    postWord,
    postSentence,
    putWord,
    putSentence,
    sentences,
    setShow,
    show,
    showEdit,
    setShowEdit,
    selectedWord,
    setSelectedWord,
    selectedSentence,
    setSelectedSentence,
    words,
  };
};
