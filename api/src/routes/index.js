const { Router } = require('express');

// Importar todos los routers:
const genresRouter      = require('./genresRouter');
const vgamesRouter      = require('./vgamesRouter');
const platformsRouter   = require('./platformsRouter');


const router = Router();

// Configurar los routers
router.use('/genres', genresRouter);
router.use('/videogames', vgamesRouter);
router.use('/platforms', platformsRouter);

module.exports = router;
