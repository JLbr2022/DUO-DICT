const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const app = express();
const port = process.env.PORT || 3000;
// const db = new Sequelize("sqlite:db_personaldict");
const db = new Sequelize({
  dialect: "sqlite",
  storage: "db_personaldict.db",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.authenticate()
  .then(() => {
    console.log("Conectado a la base de datos SQLite.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos SQLite:", err);
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Model
const Word = db.define("tb_words", {
  user: Sequelize.STRING,
  language: Sequelize.STRING,
  word: Sequelize.STRING,
  translate: Sequelize.STRING,
  comment: Sequelize.STRING,
});
db.sync();

// ROUTES
app.get("/words", (req, res) => {
  Word.findAll()
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

app.get("/words/:id", (req, res) => {
  const idWord = req.params.id;
  Word.findByPk(idWord)
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// BUSQUEDA SELECTIVA POR TIPO DE CAMPO
app.get("/words/:field/:value", (req, res) => {
  const field = req.params.field;
  const value = req.params.value;
  Word.findAll({
    where: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(field)), {
      [Op.like]: "%" + value.toLowerCase() + "%",
    }),
  })
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});
