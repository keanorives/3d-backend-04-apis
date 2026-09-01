/*
  * [ATIVIDADE 2 - Selecionar Todos]
  *
  * Copie o servidor feito na atividade 01, e acrescente uma
  * rota "GET" para o endereço "/api/beyblade" após a rota
  * "/" criada no exercício anterior.
  *
  * Esta rota deve executar o código SQL que retorna
  * todos os itens da tabela "beyblades" criada no exercício
  * anterior, e envia o resultado para o site em uma mensagem
  * no formato JSON. Siga os exemplos no arquivo "app.js"
  * para entender melhor.
  *
  * Ao final deste arquivo, use "module.exports = app" para
  * exportar o objeto do servidor para os testes automatizados.
  */
const express = require("express");
const path = require("path");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database("./beyblade.db");
db.run(`
  CREATE TABLE IF NOT EXISTS beyblades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    lamina TEXT,
    catraca TEXT,
    ponta TEXT,
    participante TEXT NOT NULL UNIQUE
  )
`);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "indexAtv.html"));
});

app.get("/api/beyblade", (req, res) => {
  db.all("SELECT * FROM beyblades", [], (erro, linhas) => {
    if (erro) {
      return res.status(400).json({ error: erro.message });
    }
    res.status(200).json({
      message: "Sucesso",
      data: linhas,
    });
  });
});
app.listen(3000);

module.exports = app;
