const db = require("../db/queries");

// async function getAllTrainers(req, res) {
//   const trainers = await db.getAllTrainers();
//   console.log("Trainers: ", trainers);
//   const pokemon = await db.getAllPokemon();
//   console.log("Pokemon: ", pokemon);

//   res.render("index", {trainers, pokemon})
// //   res.send("Trainers: " + trainers.map(trainer => trainer.name).join(", "));
// }

async function showNewTrainerForm(req, res) {
  const trainers = await db.getAllTrainers(); // [{ id, name }, ...]

  res.render("newTrainer", { trainers });
}

async function createTrainerPost(req, res) {
  const { name } = req.body;
  await db.insertTrainer(name);

  res.redirect("/");
}

module.exports = {
    showNewTrainerForm,
    createTrainerPost
};