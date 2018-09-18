const express = require("express");
const app = express();


app.get("/", (req, res) => {
  console.log(req)
  res.send({ hi: "thereeee" });
});

app.get("/teste", (req, res) => {
  res.send({ teste: "oi" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
