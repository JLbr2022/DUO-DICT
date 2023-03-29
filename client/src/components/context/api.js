// This file is used to handle API queries to the server
// payload: word or sentense content

import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL; // SERVER URL
const wordsPath = serverUrl + "words/w/word/asc"; // ENDPOINT to get all words
const sentencesPath = serverUrl + "words/s/word/asc"; // ENDPOINT to get all sentences

export const api = {
  // GETS Queries
  getWords: () => axios.get(`${wordsPath}`).catch(console.log),
  getSentences: () => axios.get(`${sentencesPath}`).catch(console.log),

  // POST Queries
  postWord: (payload) =>
    axios.post(`${serverUrl}words`, payload).catch(console.log),
  postSentence: (payload) =>
    axios.post(`${serverUrl}words`, payload).catch(console.log),

  // PUT Queries
  putWord: (payload) =>
    axios.put(`${serverUrl}words/${payload._id}`, payload).catch(console.log),
  putSentence: (payload) =>
    axios.put(`${serverUrl}words/${payload._id}`, payload).catch(console.log),

  // DELETE Queries
  deleteWord: (payload) =>
    axios
      .delete(`${serverUrl}words/${payload._id}`, payload)
      .catch(console.log),
  deleteSentence: (payload) =>
    axios
      .delete(`${serverUrl}words/${payload._id}`, payload)
      .catch(console.log),
};
