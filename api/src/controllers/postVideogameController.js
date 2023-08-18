const { Videogame } = require("../db");
const { Op } = require("sequelize");

const postVideogame = async (name, description, genres, platforms, image, released, rating) => {
    try {
        let [vgame, created] = await Videogame.findOrCreate({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            defaults: {
                name,
                description,
                genres,
                platforms,
                image,
                released,
                rating,
            }
        });

        if(!created) throw new Error("The videogame already exists");
        return vgame;

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    postVideogame,
}