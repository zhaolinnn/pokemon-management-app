const db = require("../db/queries");

async function getAllPokemon(req, res) {
  const trainers = await db.getAllTrainers();
  console.log("Trainers: ", trainers);
  const pokemon = await db.getAllPokemonWithTypes();
  console.log("Pokemon: ", pokemon);
  
  res.render("index", {trainers, pokemon});
}

async function showNewPokemonForm(req, res) {
  const types = await db.getAllTypes();      // [{ id, name }, ...]
  const trainers = await db.getAllTrainers(); // [{ id, name }, ...]

  res.render("new", { types, trainers });
}

async function createPokemonPost(req, res) {
  const { name, trainer_id, type_ids } = req.body;

  // Normalize type_ids to an array
  const ids = Array.isArray(type_ids) ? type_ids : [type_ids];

  // Validate type count
  if (ids.length < 1 || ids.length > 2) {
    return res.status(400).send("Pokémon must have 1 or 2 types");
  }

  // 1️⃣ Insert pokemon and get its ID
  const pokemon = await db.insertPokemon(name, trainer_id);

  // 2️⃣ Insert into junction table
  for (const typeId of ids) {
    await db.addPokemonType(pokemon.id, typeId);
  }

  res.redirect("/");
}

module.exports = {
    getAllPokemon,
    showNewPokemonForm,
    createPokemonPost
};