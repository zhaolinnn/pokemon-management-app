const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController");
const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.getAllPokemon);
pokemonRouter.get("/pokemon/new", pokemonController.showNewPokemonForm);

pokemonRouter.post('/pokemon/new', pokemonController.createPokemonPost);

module.exports = pokemonRouter;
