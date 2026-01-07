const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController");
const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.getAllPokemon);
pokemonRouter.get("/new", pokemonController.showNewPokemonForm);
pokemonRouter.get("/:id", pokemonController.showPokemonDetails);

pokemonRouter.post('/new', pokemonController.createPokemonPost);
pokemonRouter.post('/:id/delete', pokemonController.deletePokemonPost);

pokemonRouter.get('/:id/edit', pokemonController.showEditPokemonForm);
pokemonRouter.post('/:id/edit', pokemonController.updatePokemonPost);

module.exports = pokemonRouter;
