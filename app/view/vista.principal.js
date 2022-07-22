// Importar los modulos necesarios
const controladorPrincipal = require('../controller/controlador.principal');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    //Endpoint para realizar el robustecimiento del API
    app.post('/herramientas/v1/robustecimiento', async(req, res) => {
        const requestBody = req.body;
        try{
            const resultado = await controladorPrincipal.robustecer(requestBody);
            res.status(200).json({mensaje: 'Robustecimiento exitoso', resultado});
        } catch(error) {
            console.log(error.message);
            res.status(400).json({mensaje: error.message});
        }
    });

    //Endpoint para realizar el cifrado en RSA del API
    app.post('/herramientas/v1/rsa/cifrar', async(req, res) => {
        const accesoPublico = req.body.accesoPublico;
        const requestBody = req.body.requestBody;
        try {
            const resultado = await controladorPrincipal.encriptarRsa(requestBody, accesoPublico);
            res.status(200).json({mensaje: 'Cifrado RSA exitoso', resultado});
        } catch (error) {
            res.status(400).json({mensaje: error.message});
        }
    });

    //Endpoint para realizar el descifrado en RSA del API
    app.post('/herramientas/v1/rsa/descifrar', async(req, res) =>{
        const accesoPrivado = req.body.accesoPrivado;
        const requestBody = req.body.requestBody;
        try {
            const resultado = await controladorPrincipal.descifrarRsa(requestBody, accesoPrivado);
            res.status(200).json({mensaje: 'Descifrado RSA exitoso', resultado});
        } catch (error) {
            res.status(400).json({mensaje: error.message});
        }
    });

    //Endpoint para realizar el cifrado en AES del API
    app.post('/herramientas/v1/aes/cifrar', async(req, res) =>{
        const accesoSimetrico = req.body.accesoSimetrico;
        const codigoHash = req.body.codigoHash;
        const requestBody = req.body.requestBody;
        try {
            const resultado = await controladorPrincipal.encriptarAes(requestBody, accesoSimetrico, codigoHash);
            res.status(200).json({mensaje: 'Cifrado AES exitoso', resultado});
        } catch (error) {
            res.status(400).json({mensaje: error.message});
        }
    });

    //Endpoint para realizar el descifrado en AES del API
    app.post('/herramientas/v1/aes/descifrar', async(req, res) =>{
        const accesoSimetrico = req.body.accesoSimetrico;
        const codigoHash = req.body.codigoHash;
        const requestBody = req.body.requestBody;
        try {
            const resultado = await controladorPrincipal.descifrarAes(requestBody, accesoSimetrico, codigoHash);
            res.status(200).json({mensaje: 'Descifrado AES exitoso', resultado});
        } catch (error) {
            res.status(400).json({mensaje: error.message});
        }
    });
}