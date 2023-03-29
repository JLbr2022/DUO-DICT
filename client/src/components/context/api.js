import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const api = {
  getWords: () => axios.get(`${serverUrl}words`).catch(console.log), // TODO change url
  getSentences: () => axios.get(`${serverUrl}sentences`).catch(console.log), // TODO change url
  postWord: (payload) =>
    axios.post(`${serverUrl}words`, payload).catch(console.log), // TODO change url
  postSentence: (payload) =>
    axios.post(`${serverUrl}sentences`, payload).catch(console.log), // TODO change url
};

// payload: word or sentense content
