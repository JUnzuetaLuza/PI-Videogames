const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");


const getVideogameById = async (id) => {
    try {
        if(id.includes("-")) { //Videogames from BD
            let vgameDB = await Videogame.findByPk(id,{
                include: [Genre],
              });
              
              const videogameDB = {
                id: vgameDB.dataValues.id,
                name: vgameDB.dataValues.name,
                genres: vgameDB.dataValues.genres?.map((genre) => genre.name),
                platforms: vgameDB.dataValues.platforms,
                released: vgameDB.dataValues.released,
                image: vgameDB.dataValues.img,
                rating: vgameDB.dataValues.rating,
                description: vgameDB.dataValues.description,
            }
            return videogameDB;

        } else { //Videogames from API
            let vgameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            vgameApi = vgameApi.data;

            const videogameApi = {
                id: vgameApi.id,
                name: vgameApi.name,
                genres: vgameApi.genres?.map((genre) => genre.name),
                platforms: vgameApi.platforms?.map(plat => plat.platform.name),
                released: vgameApi.released,
                image: vgameApi.background_image,
                rating: vgameApi.rating,
                description: vgameApi.description,
            }
            return videogameApi;
        };
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getVideogameById,
}