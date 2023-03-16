import express from "express";
import mysql from "mysql2";

const app = express();
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "bankify",
  password: "YOUR_PASSWORD",
});

const PORT = 3000;
const tempId = 1;

let tempUser = {
  name: "John",
  balance: 500,
};

app.listen(PORT, () => {
  console.log(`server live on port http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("server live");
});

app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.get(`/:id/balance`, (req, res) => {
  const id = req.params.id;

  const sql = `SELECT balance 
  FROM savings 
  WHERE user_id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    let balance = data[0] ? data[0].balance.toString() : null;

    if (balance) {
      res.send(balance);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get(`/:id`, (req, res) => {
  const id = req.params.id;

  const sql = `SELECT fname 
  FROM users 
  WHERE id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;
    let name = data[0] ? data[0].fname : null;

    if (name) {
      res.send(name);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post(`/${tempId}/balance/deposit`, (req, res) => {
  const amount = Number(req.body.amount);

  //balance will be user specific
  //sanitize request
  if (amount <= 0) {
    res.status(400).send("can only deposit amounts greater than 0");
  }

  tempUser.balance += amount;

  res.sendStatus(200);
});

app.post(`/${tempId}/balance/withdraw`, (req, res) => {
  const amount = Number(req.body.amount);

  //balance will be user specific
  //sanitize request
  if (amount <= 0) {
    res.status(400).send("can only withdraw amounts greater than 0");
  }
  if (amount > tempUser.balance) {
    res.status(400).send("balance isn't large enough");
  }

  tempUser.balance -= amount;

  res.sendStatus(200);
});
