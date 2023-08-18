const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getVideogames = async () => {
    try {
        //API
        let arrayApi = [];
        for(let i = 1; i <= 5; i++) {
            arrayApi = [...arrayApi, `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`]
        };
        let mapedApi = arrayApi.map((url)=> axios.get(url));
        mapedApi = await Promise.all(mapedApi);
        mapedApi = mapedApi?.map((response) => response.data.results).flat();
        mapedApi = mapedApi?.map((vgame) => {
            return {
                id: vgame.id,
                name: vgame.name,
                genres: vgame.genres?.map((genre) => genre.name),
                platforms: vgame.platforms?.map((plat)=> plat.platform.name),
                released: vgame.released,
                image: vgame.background_image,
                rating: vgame.rating,
            };
        });
        //DataBase
        let videogamesDB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes:  ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        videogamesDB = videogamesDB?.map((vgame)=> {
            return {
                id: vgame.id,
                name: vgame.name,
                description: vgame.description,
                genres: vgame.genres?.map((genre) => genre.name),
                platforms: vgame.platforms,
                released: vgame.released,
                image: vgame.background_image,
                rating: vgame.rating,
            };
        });

        return [...mapedApi, ...videogamesDB];
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = {
    getVideogames,
}