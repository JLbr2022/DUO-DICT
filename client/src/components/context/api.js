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

  // PUT Query
  putWord: (id, payload) =>
    axios.put(`${serverUrl}words/${id}`, payload).catch(console.log),

  putSentence: (id, payload) =>
    axios.put(`${serverUrl}words/${id}`, payload).catch(console.log),

  // DELETE Query
  deleteWord: (id) =>
    axios.delete(`${serverUrl}words/${id}`).catch(console.log),

  deleteSentence: (id) =>
    axios.delete(`${serverUrl}words/${id}`).catch(console.log),
};
