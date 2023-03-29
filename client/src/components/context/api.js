import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const wordsPath = serverUrl + "words/w/word/asc";
const sentencesPath = serverUrl + "words/s/word/asc";

export const api = {
  getWords: () => axios.get(`${wordsPath}`).catch(console.log),
  getSentences: () => axios.get(`${sentencesPath}`).catch(console.log),

  postWord: (payload) =>
    axios.post(`${serverUrl}words`, payload).catch(console.log), // TODO change url
  postSentence: (payload) =>
    axios.post(`${serverUrl}words`, payload).catch(console.log), // TODO change url
};

// payload: word or sentense content
