const { Router } = require("express");
const { getVideogamesHandler } = require("../handlers/getVideogamesHandler");
const { getVideogameByIdHandler } = require("../handlers/getVideogameByIdHandler");
const { postVideogameHandler } = require("../handlers/postVideogameHandler");
const vgamesRouter = Router();

vgamesRouter.get("/", getVideogamesHandler);
vgamesRouter.get("/:idVideogame", getVideogameByIdHandler);
vgamesRouter.post("/", postVideogameHandler);

module.exports = vgamesRouter;