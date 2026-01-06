const { Router } = require("express");
const trainerController = require("../controllers/trainerController");
const trainerRouter = Router();

trainerRouter.get("/new", trainerController.showNewTrainerForm);

trainerRouter.post('/new', trainerController.createTrainerPost);

module.exports = trainerRouter;
