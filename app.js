require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {

  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
  console.log(process.env.DATABASE_URL);
});
