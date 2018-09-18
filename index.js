const express = require("express");
const app = express();


app.get("/", (req, res) => {
  console.log(req)
  res.send({ hi: "there" });
});

app.get("/teste", (req, res) => {
  res.send({ teste: "oi" })
})

const PORT = process.env.PORT
app.listen(PORT)
