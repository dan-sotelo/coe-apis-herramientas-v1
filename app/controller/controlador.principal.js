//Importar los modulos necesarios
const appServiciosRobustecimiento = require('../../services/service.robustecimiento');
const appServiciosEncriptacionRSA = require('../../services/service.encrypt.rsa');
const appServiciosDescrifradoRSA = require('../../services/service.decrypt.rsa');
const appServiciosEncriptacionAES = require('../../services/service.encrypt.aes');
const appServiciosDescrifradoAES = require('../../services/service.decrypt.aes');

// Definir los modulos
const robustecer = async(requestBody) =>{
    try {
        const respuestas = {cadena: "bad", entero: 1234, flotante: 1.99, boleano: false, nulo: null, vacio: ""}
        return await appServiciosRobustecimiento.robustecer(requestBody, respuestas);
    } catch (error) {
        console.log(`Error en el controlador: ${error}`);
        throw new Error(error.message);
    }
}

const encriptarRsa = async(requestBody, accesoPublico) => {
    try {
        return await appServiciosEncriptacionRSA.encriptarRsa(requestBody, accesoPublico);
    } catch (error) {
        console.log(`Error en el controlador: ${error}`);
        throw new Error(error.message);
    }
}

const descifrarRsa = async(requestBody, accesoPrivado) =>{
    try{
        return await appServiciosDescrifradoRSA.descifrarRsa(requestBody, accesoPrivado);
    } catch (error) {
        console.log(`Error en el controlador: ${error}`);
        throw new Error(error.message);
    }
}

const encriptarAes = async(requestBody, accesoSimetrico, codigoHash) => {
    try {
        return await appServiciosEncriptacionAES.encriptarAes(requestBody, accesoSimetrico, codigoHash);
    } catch (error) {
        console.log(`Error en el controlador: ${error}`);
        throw new Error(error.message);
    }
}

const descifrarAes = async(requestBody, accesoSimetrico, codigoHash) =>{
    try {
        return await appServiciosDescrifradoAES.descifrarAes(requestBody, accesoSimetrico, codigoHash);
    } catch (error) {
        console.log(`Error en el controlador: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {robustecer, encriptarRsa, descifrarRsa, encriptarAes, descifrarAes}