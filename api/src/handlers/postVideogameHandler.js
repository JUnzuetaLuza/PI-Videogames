const { postVideogame } = require("../controllers/postVideogameController");
const { Genre } = require("../db");


const postVideogameHandler = async (req, res) => {
    try {
        const { name, description, platforms, image, released, rating, genres} = req.body;
        const newVideogame = await postVideogame(name, description, platforms, image, released, rating);
        let genresDB = await Genre.findAll({
            where: {
                name: genres,
            },
        });
        newVideogame.addGenre(genresDB);
        res.status(200).json(newVideogame);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postVideogameHandler
}