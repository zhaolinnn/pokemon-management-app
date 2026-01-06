const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController");
const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.getAllPokemon);
pokemonRouter.get("/new", pokemonController.showNewPokemonForm);

pokemonRouter.post('/new', pokemonController.createPokemonPost);

module.exports = pokemonRouter;
