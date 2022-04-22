// Importar los modulos requeridos
const rateLimit = require('express-rate-limit');

// Límite de las consultas por usuario
const requestLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Excedio la cantidad máxima de consultas'
});

module.exports = {requestLimit}