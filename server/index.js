import express from "express";

const app = express();

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

app.get(`/${tempId}/balance`, (req, res) => {
  res.send(JSON.stringify(tempUser.balance));
});

app.get(`/${tempId}/name`, (req, res) => {
  res.send(JSON.stringify(tempUser.name));
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
