// This file is used to handle API queries to the server
// payload: word or sentense content

import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL; // SERVER URL
const wordsPath = serverUrl + "words/w/word/asc"; // ENDPOINT to get all words
const sentencesPath = serverUrl + "words/s/word/asc"; // ENDPOINT to get all sentences
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const api = {
  // GETS Queries
  getWords: () => axios.get(`${wordsPath}`).catch(console.log),
  getSentences: () => axios.get(`${sentencesPath}`).catch(console.log),
  // POST Queries
  postWord: (payload) =>
    axiosInstance.post(`words`, payload).catch(console.log),
  // PUT Query
  putWord: (payload) =>
    axiosInstance.put(`words/${payload.id}`, payload).catch(console.log),
  // DELETE Query
  deleteWord: (id) => axiosInstance.delete(`/words/${id}`).catch(console.log),

};
