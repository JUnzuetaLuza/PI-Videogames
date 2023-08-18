const { postVideogame } = require("../controllers/postVideogameController");
const { Genre } = require("../db");


const postVideogameHandler = async (req, res) => {
    try {
        const { name, description, genres, platforms, image, released, rating} = req.body;
        const newVideogame = await postVideogame(name, description, genres, platforms, image, released, rating);
        res.status(200).json(newVideogame);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postVideogameHandler
}