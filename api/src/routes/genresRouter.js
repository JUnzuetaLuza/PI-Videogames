const { Router } = require("express");
const { getGenresHandler } = require("../handlers/getGenresHandler");
const genresRouter = Router();

genresRouter.get("/", getGenresHandler);

module.exports = genresRouter;