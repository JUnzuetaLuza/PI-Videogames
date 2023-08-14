const { getVideogameByName } = require("../controllers/getVideogamesByNameController");
const { getVideogames } = require("../controllers/getVideogamesController");

const getVideogamesHandler = async (req,res) => {
    const { name } = req.query;
    let response;
    try {
        if (name) {
            response = await getVideogameByName(name);
        }   else {
            response = await getVideogames();
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getVideogamesHandler
}