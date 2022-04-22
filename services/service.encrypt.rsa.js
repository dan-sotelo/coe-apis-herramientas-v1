// Importar los modulos necesarios
const crypto = require('crypto');

//Definir funciones
const cifrarRsa = (plainText, publicKey) =>{
    try {
        const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
        const valorCifrado = crypto.publicEncrypt({
            key: publicKeyPEM,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(plainText));
        return valorCifrado.toString('base64');
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(error.message);
    }
}

const recorrerArreglo = async(arreglo, accesoPublico, requiereCifrado) =>{
    try {
        for (let indice = 0; indice < arreglo.length; indice++){
            if(typeof(arreglo[indice]) == "object" && Array.isArray(arreglo[indice])){
                await recorrerArreglo(arreglo[indice], accesoPublico, requiereCifrado);
            } else if(typeof(arreglo[indice]) == "object"){
                await recorrerObjeto(arreglo[indice], accesoPublico);
            } else if (requiereCifrado){
                arreglo[indice] = cifrarRsa(arreglo[indice].toString(), accesoPublico);
            }
        }
    } catch (error) {
        console.log(`Error al recorrer el objeto: ${error}`);
        throw new Error(error.message);
    }
}

const recorrerObjeto = async(objeto, accesoPublico) =>{
    try {
        for (atributo in objeto){
            let requiereCifrado = (atributo[0] == '*' ? true : false);
            if(typeof(objeto[atributo]) == "object" && Array.isArray(objeto[atributo])){
                await recorrerArreglo(objeto[atributo], accesoPublico, requiereCifrado);
            } else if (typeof(objeto[atributo]) == "object"){
                await recorrerObjeto(objeto[atributo], accesoPublico);
            } else if(requiereCifrado){
                objeto[atributo] = cifrarRsa(objeto[atributo].toString(), accesoPublico);
            }
        }
    } catch (error) {
        console.log(`Error al recorrer el objeto: ${error}`);
        throw new Error(error.message);
    }
}

// Definir servicios para la encriptación en RSA
const encriptarRsa = async(requestBody, accesoPublico) => {
    try {
        await recorrerObjeto(requestBody, accesoPublico);
        return await JSON.parse(JSON.stringify(requestBody).replace(/(\*)/g,''));
    } catch (error) {
        console.log(`Error en los servicios: ${error}`);
        throw new Error(error.message);
    }
}

//Exportar modulos
module.exports = {encriptarRsa}