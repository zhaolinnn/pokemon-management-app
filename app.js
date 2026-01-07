require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const pokemonRouter = require("./routes/pokemonRouter");
const trainerRouter = require("./routes/trainerRouter");

app.use(express.static(path.join(__dirname, "public")));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemonRouter);
app.use("/trainer", trainerRouter);

app.get("/", (req, res) => res.redirect("/pokemon"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {

  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
  console.log(process.env.DATABASE_URL);
});
