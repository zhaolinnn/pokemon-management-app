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

  res.render("newPokemon", { types, trainers });
}

async function createPokemonPost(req, res) {
  const { name, trainer_id, type_ids } = req.body;

  // Normalize type_ids to an array
  const ids = Array.isArray(type_ids) ? type_ids : [type_ids];

  // Validate type count
  if (ids.length < 1 || ids.length > 2) {
    return res.status(400).send("Pokémon must have 1 or 2 types");
  }

  // Insert pokemon and get its ID
  const pokemon = await db.insertPokemon(name, trainer_id);

  // Insert into junction table
  for (const typeId of ids) {
    await db.addPokemonType(pokemon.id, typeId);
  }

  res.redirect("/");
}

async function showPokemonDetails(req, res) {
  const { id } = req.params;

  const pokemon = await db.getPokemonById(id);
  res.render("pokemonDetails", { pokemon });
}

async function deletePokemonPost(req, res) {
  const { id } = req.params;
  await db.deletePokemonById(id);
  res.redirect("/");
}

async function showEditPokemonForm(req, res) {
  const { id } = req.params;
  const pokemon = await db.getPokemonById(id);
  const trainers = await db.getAllTrainers();
  const types = await db.getAllTypes();

  res.render("editPokemon", {
    pokemon,
    trainers,
    types
  });
}

async function updatePokemonPost(req, res) {
  const { id } = req.params;
  const { name, trainer_id, type_ids } = req.body;

  const ids = Array.isArray(type_ids) ? type_ids : [type_ids];
  if (ids.length < 1 || ids.length > 2) {
    return res.status(400).send("Choose 1 or 2 types");
  }

  await db.updatePokemon(id, name, trainer_id);
  await db.deletePokemonTypes(id);

  for (const typeId of ids) {
    await db.addPokemonType(id, typeId);
  }

  res.redirect("/");
}

module.exports = {
    getAllPokemon,
    showNewPokemonForm,
    createPokemonPost,
    showPokemonDetails,
    deletePokemonPost,
    showEditPokemonForm,
    updatePokemonPost,
};