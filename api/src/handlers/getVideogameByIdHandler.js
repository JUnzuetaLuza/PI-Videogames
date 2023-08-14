const { getVideogameById } = require("../controllers/getVideogamesByIdController");

const getVideogameByIdHandler = async (req, res) => {
    const { idVideogame } = req.params;
    try {
        const response = await getVideogameById(idVideogame);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getVideogameByIdHandler
}