require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const pokemonRouter = require("./routes/pokemonRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", pokemonRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {

  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
  console.log(process.env.DATABASE_URL);
});
