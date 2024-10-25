const pg = require("pg");

require("dotenv").config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao banco de dados:", res.rows[0]);
  }
});

module.exports = pool;
