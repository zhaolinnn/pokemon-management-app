const db = require("../db/queries");

async function getAllPokemon(req, res) {
  const pokemon = await db.getAllPokemon();
  console.log("Pokemon: ", pokemon);
  res.send("Pokemon: " + pokemon.map(pokemon => pokemon.name).join(", "));
}

module.exports = {
    getAllPokemon
};