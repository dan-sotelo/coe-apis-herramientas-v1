// Importar los modulos necesarios
const controladorPrincipal = require('../controller/controlador.principal');

// Definir los endpoints y exportar los modulos
module.exports = async(app) =>{
    //Endpoint para realizar el robustecimiento del API
    app.post('/herramientas/v1/robustecimiento', async(req, res) => {
        const requestBody = req.body;
        try{
            const robustecimiento = await controladorPrincipal.robustecer(requestBody);
            res.status(200).json({message: 'Robustecimiento exitoso', robustecimiento});
        } catch(error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    });

    app.post('/herramientas/v1/rsa/cifrar', async(req, res) => {
        const accesoPublico = req.body.accesoPublico;
        const requestBody = req.body.requestBody;
        try {
            const encriptacionRsa = await controladorPrincipal.encriptarRsa(requestBody, accesoPublico);
            res.status(200).json({message: 'Cifrado RSA exitoso', encriptacionRsa});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    });

    app.post('/herramientas/v1/rsa/descifrar', async(req, res) =>{
        const accesoPrivado = req.body.accesoPrivado;
        const requestBody = req.body.requestBody;
        try {
            const desifradoRsa = await controladorPrincipal.descifrarRsa(requestBody, accesoPrivado);
            res.status(200).json({message: 'Descifrado RSA exitoso', desifradoRsa});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    });

    app.post('/herramientas/v1/aes/cifrar', async(req, res) =>{
        const accesoSimetrico = req.body.accesoSimetrico;
        const codigoHash = req.body.codigoHash;
        const requestBody = req.body.requestBody;
        try {
            const encriptacionAes = await controladorPrincipal.encriptarAes(requestBody, accesoSimetrico, codigoHash);
            res.status(200).json({message: 'Cifrado AES exitoso', encriptacionAes});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    });

    app.post('/herramientas/v1/aes/descifrar', async(req, res) =>{
        const accesoSimetrico = req.body.accesoSimetrico;
        const codigoHash = req.body.codigoHash;
        const requestBody = req.body.requestBody;
        try {
            const descifradoAes = await controladorPrincipal.descifrarAes(requestBody, accesoSimetrico, codigoHash);
            res.status(200).json({message: 'Descifrado AES exitoso', descifradoAes});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    });
}