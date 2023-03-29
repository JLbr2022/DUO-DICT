// This module contain all App's logic control
// to keep the components code clear and easy to understand

import { useEffect, useState } from "react";
import { api } from "./api";

export const useStore = () => {
  const [words, setWords] = useState([]);
  const [show, setShow] = useState(false);
  const [sentences, setSentences] = useState([]);
  const getWords = () =>
    api.getWords().then((response) => setWords(response.data));
  const getSentences = () =>
    api.getSentences().then((response) => setSentences(response.data));
  const postWord = (payload) => api.postWord(payload);
  const postSentence = (payload) => api.postSentence(payload);

  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  return {
    words,
    sentences,
    getWords,
    getSentences,
    postWord,
    postSentence,
    show,
    setShow,
  };
};