const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const app = express();
const port = process.env.PORT || 4000;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Database connection
const db = new Sequelize({
  dialect: "sqlite",
  storage: "db_personaldict.db",
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Test connection
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
const TbWord = db.define("tb_words", {
  user: Sequelize.STRING,
  language: Sequelize.STRING,
  word: Sequelize.STRING,
  translate: Sequelize.STRING,
  comment: Sequelize.STRING,
});
db.sync();

// ROUTES
// GET ALL
app.get("/words", (req, res) => {
  TbWord.findAll()
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// GET BY ID
app.get("/words/:id", (req, res) => {
  const idTbWord = req.params.id;
  TbWord.findByPk(idTbWord)
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// GET BY USER
app.get("/words/user", (req, res) => {
  const idTbWord = req.params.id;
  TbWord.findByPk(idTbWord)
    .then((words) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// GET BY SELECTIVE FIELD AND VALUE
app.get("/words/:field/:value", (req, res) => {
  const field = req.params.field;
  const value = req.params.value;
  TbWord.findAll({
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

// ADD WORD
app.post("/words", (req, res) => {
  TbWord.create(req.body)
    .then((word) => {
      res.json(word);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// DELETE WORD
app.delete("/words/:id", (req, res) => {
  const id = req.params.id;
  TbWord.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Word has been deleted!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});

// UPDATE WORD
app.put("/words/:id", (req, res) => {
  const id = req.params.id;
  TbWord.update(req.body, {
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Word has been updated!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
});
