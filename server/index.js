//TODO could use more middleware

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

app.listen(PORT, () => {
  console.log(`server live on port http://localhost:${PORT}`);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.get(`/user/balance`, (req, res) => {
  const id = req.params.id;

  const sql = `SELECT balance 
  FROM savings 
  WHERE user_id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    let balance = data[0] ? data[0].balance.toString() : null;

    if (balance) {
      res.send(`${balance}\n`);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get(`/user/:id`, (req, res) => {
  const id = req.params.id;

  const sql = `SELECT fname 
  FROM users 
  WHERE id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;
    let name = data[0] ? data[0].fname : null;

    if (name) {
      res.send(`${name}\n`);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post(`/user/:id/balance/deposit`, (req, res) => {
  const depositAmount = Number(req.body.amount);

  // make sure deposit is valid
  if (depositAmount <= 0) {
    res.status(400).send("can only deposit amounts greater than 0\n");
    return;
  }

  const id = req.params.id;

  const sql = `SELECT balance
  FROM savings
  WHERE user_id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    // check to see if a balance exists for the provided id
    if (data[0]) {
      const { balance } = data[0];
      const newBalance = balance + depositAmount;

      //update the users balance
      db.query(
        `UPDATE savings
        SET balance = ${newBalance}
        WHERE user_id = ${id}`,
        (err) => {
          if (err) throw err;
          res.send(JSON.stringify(newBalance) + "\n");
        }
      );
    } else {
      res.status(400).send("user doesn't have an account\n");
    }
  });
});

app.post(`user/:id/balance/withdraw`, (req, res) => {
  const withdrawAmount = Number(req.body.amount);

  //sanitize request
  if (withdrawAmount <= 0) {
    res.status(400).send("can only withdraw amounts greater than 0\n");
    return;
  }

  const id = req.params.id;

  const sql = `SELECT balance
  FROM savings
  WHERE user_id = ${id}`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    // check to see if a balance exists for the provided id
    if (data[0]) {
      const { balance } = data[0];
      if (withdrawAmount > balance) {
        res.status(400).send("withdraw amount exceeds balance\n");
        return;
      }

      const newBalance = balance - withdrawAmount;

      //update the users balance
      db.query(
        `UPDATE savings
        SET balance = ${newBalance}
        WHERE user_id = ${id}`,
        (err) => {
          if (err) throw err;
          res.send(JSON.stringify(newBalance) + "\n");
        }
      );
    } else {
      res.status(400).send("user doesn't have an account\n");
    }
  });
});

app.post("/signup", (req, res) => {
  const { userName, fname, lname, email, password } = req.body;

  // https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
  let dateCreated = new Date().toISOString().slice(0, 19).replace("T", " ");

  const sql = `INSERT INTO users (fname, lname, email, password, user_name, date_created)
  VALUES ("${fname}", "${lname}", "${email}", "${password}", "${userName}", "${dateCreated}" )`;

  // try to create the user
  db.query(sql, (err, data) => {
    if (err) {
      // username is already taken
      if (err.errno === 1062) {
        res.sendStatus(400);
        return;
      }
      throw err;
    } else {
      res.sendStatus(200 + "\n");
    }
  });
});

app.post("/login", async (req, res) => {
  const sql = `SELECT user_name, password
  FROM users
  WHERE user_name = "${req.body.userName}"`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    if (data.length === 0) {
      res.status(404).send("user name not found\n");
    }

    // check if provided password matches db
    if (data[0].password === req.body.password) {
      //log user in
      res.send(`Logged in as ${req.body.userName}\n`);
    } else {
      //password is incorrect
      res.sendStatus(401);
    }
  });
});
