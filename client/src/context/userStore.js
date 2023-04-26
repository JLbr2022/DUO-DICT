// This module contain all App's logic control and state management
// to keep the components code clean and easy to understand

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "./api";
import { useLocation } from "react-router-dom";

export const Severity = {
  warning: "warning",
  error: "error",
  info: "info",
  success: "success",
};

export const languages = [
  {
    label: "English",
    value: "EN",
  },
  {
    label: "Italian",
    value: "IT",
  },
];

export const useStore = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredDictionary, setFilteredDictionary] = useState([]);
  const [toast, setToast] = useState({});
  const [confirm, setConfirm] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

  const clearToast = () => setToast({});
  const clearConfirm = () => setConfirm({});

  const isWord = location.pathname.includes("/words/w");
  const isSentence = location.pathname.includes("/words/s");

  const getWords = () => {
    api.getWords().then((response) => {
      setWords(response.data);
      setLastUpdate(new Date().toISOString());
    });
  };

  const getSentences = () => {
    api.getSentences().then((response) => {
      setSentences(response.data);
      setLastUpdate(new Date().toISOString());
    });
  };

  const postWord = (payload) => {
    const type = isWord ? "W" : "S";
    api.postWord({ ...payload, type }).then(() => {
      isWord ? getWords() : getSentences();
      setToast({
        severity: Severity.success,
        message: t("app.messages.saved", {
          type: isWord ? "Word" : "Sentence",
        }),
      });
      setLastUpdate(new Date().toISOString());
    });
  };

  const putWord = (word) => {
    api.putWord(word).then(() => {
      isWord ? getWords() : getSentences();
      setToast({
        severity: Severity.success,
        message: t("app.messages.updated", {
          type: isWord ? "Word" : "Sentence",
        }),
      });
    });
  };

  const deleteWord = () => {
    api.deleteWord(selectedWord.id).then(() => {
      isWord ? getWords() : getSentences();
      setToast({
        severity: Severity.success,
        message: t("app.messages.deleted", {
          type: isWord ? "Word" : "Sentence",
        }),
      });
    });
  };

  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  useEffect(() => {
    const applyFilter = (filter) => {
      const _array = isWord ? words : sentences;
      if (!filter) {
        setFilteredDictionary(_array);
        return;
      }
      const filtered = _array.filter((word) => {
        const a = word.word?.toLowerCase().includes(filter.toLowerCase());
        const b = word.translate?.toLowerCase().includes(filter.toLowerCase());
        return a || b;
      });
      setFilteredDictionary(filtered);
    };

    applyFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWord, filter, lastUpdate]);

  return {
    deleteWord,
    postWord,
    putWord,
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    selectedWord,
    setSelectedWord,
    isWord,
    isSentence,
    toast,
    setToast,
    clearToast,
    filter,
    setFilter,
    filteredDictionary,
    confirm,
    setConfirm,
    clearConfirm,
  };
};
