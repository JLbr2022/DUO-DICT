const axios = require("axios");

const data = {
  id: 995,
  user: "José",
  type: "W",
  language: "EN",
  word: "hello",
  translate: "hola",
  comment: "greeting",
  updatedAt: "2023-03-31T18:11:34.174Z",
  createdAt: "2023-03-31T18:11:34.174Z",
};

axios
  .post("http://localhost:4000/words/", data)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
