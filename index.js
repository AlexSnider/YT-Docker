const express = require("express");
const pool = require("./database/pgConnection");

const app = express();

app.use(express.json());

app.post("/dados", (req, res) => {
  const { nome, sobrenome } = req.body;

  try {
    const query = `INSERT INTO pessoa (nome, sobrenome) VALUES ($1, $2) RETURNING *`;
    pool.query(query, [nome, sobrenome], (err, result) => {
      if (err) {
        console.error("Erro ao inserir:", err);
        return res.status(500).send("Erro ao inserir dados");
      }
      console.log("Inserido:", result.rows);
      return res.status(201).json(result.rows);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro no servidor");
  }
});

app.get("/dados", (req, res) => {
  pool.query("SELECT * FROM pessoa", (err, result) => {
    if (err) {
      console.error("Erro ao buscar:", err);
      return res.status(500).send("Erro ao buscar dados");
    }
    console.log("Resultado da busca:", result.rows);
    return res.status(200).json(result.rows);
  });
});

app.listen(3007, () => {
  console.log("Server started on port 3007");
});
