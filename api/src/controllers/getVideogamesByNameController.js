const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const { API_KEY} = process.env;
const axios = require("axios");


const getVideogameByName = async (name) => {
    try {
        let arrayApiDB = [];
        //API
        let apiResponse = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        apiResponse = apiResponse.data.results;
        if(apiResponse.length) {
            apiResponse = apiResponse.splice(0,15);
            
            apiResponse = apiResponse?.map((vgame) => {
                return {
                    id: vgame.id,
                    name: vgame.name,
                    genres: vgame.genres?.map((genre) => genre.name),
                    platforms: vgame.platfoms?.map((plat)=> plat.platform.name),
                    released: vgame.released,
                    image: vgame.background_image,
                    rating: vgame.rating,
                    description: vgame.description,
                };
            });
        };
        //DataBase
        let dbResponse = await Videogame.findAll({
            where:{
                name: { [Op.iLike]: `%${name}%`},
            },
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        if(dbResponse.length) {
            dbResponse = dbResponse.map((vgame) => {
                return {
                    id: vgame.id,
                    name: vgame.name,
                    description: vgame.description,
                    genres: vgame.genres?.map((genre) => genre.name),
                    platforms: vgame.platfoms,
                    released: vgame.released,
                    image: vgame.background_image,
                    rating: vgame.rating,
                };
            });
        };

        arrayApiDB = [...apiResponse, ...dbResponse];

        if(arrayApiDB.length == 0) throw new Error("Oops... We cannot get the game :(")
        return arrayApiDB;
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = {
    getVideogameByName,
}