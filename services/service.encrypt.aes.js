// Importar los modulos necesarios
const crypto = require('crypto');

//Definir funciones
const getAlgorithm = (keyBase64) => {
    let key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';
    }
}

const cifrarAes = (texto, accesoSimetrico, codigoHash) =>{
    try {
        const plainText = texto.replace(/['"]+/g, '');
        const aesKey = Buffer.from(accesoSimetrico, 'base64');
        const aesHmac = Buffer.from(codigoHash, 'base64');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(getAlgorithm(aesKey), aesKey, iv);
        const cipherText = Buffer.concat([cipher.update(Buffer.from(plainText,'utf8')), cipher.final()]);
        const iv_cipherText = Buffer.concat([iv, cipherText]);
        let hmac = crypto.createHmac('SHA256', aesHmac).update(iv_cipherText).digest();
        const iv_cipherText_hmac = Buffer.concat([iv_cipherText, hmac]);
        return iv_cipherText_hmac.toString("base64");
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(error.message);
    }
}

const recorrerArreglo = async(arreglo, accesoSimetrico, codigoHash, requiereCifrado) =>{
    try {
        for (let indice = 0; indice < arreglo.length; indice++){
            if(typeof(arreglo[indice]) == "object" && Array.isArray(arreglo[indice])){
                await recorrerArreglo(arreglo[indice], accesoSimetrico, codigoHash, requiereCifrado);
            } else if(typeof(arreglo[indice]) == "object"){
                await recorrerObjeto(arreglo[indice], accesoSimetrico, codigoHash);
            } else if (requiereCifrado){
                arreglo[indice] = cifrarAes(arreglo[indice].toString(), accesoSimetrico, codigoHash);
            }
        }
    } catch (error) {
        console.log(`Error al recorrer el objeto: ${error}`);
        throw new Error(error.message);
    }
}

const recorrerObjeto = async(objeto, accesoSimetrico, codigoHash) =>{
    try {
        for (atributo in objeto){
            let requiereCifrado = (atributo[0] == '*' ? true : false);
            if(typeof(objeto[atributo]) == "object" && Array.isArray(objeto[atributo])){
                await recorrerArreglo(objeto[atributo], accesoSimetrico, codigoHash, requiereCifrado);
            } else if (typeof(objeto[atributo]) == "object"){
                await recorrerObjeto(objeto[atributo], accesoSimetrico, codigoHash);
            } else if(requiereCifrado){
                objeto[atributo] = cifrarAes(objeto[atributo].toString(), accesoSimetrico, codigoHash);
            }
        }
    } catch (error) {
        console.log(`Error al recorrer el objeto: ${error}`);
        throw new Error(error.message);
    }
}

// Definir servicios para la encriptación en RSA
const encriptarAes = async(requestBody, accesoSimetrico, codigoHash) => {
    try {
        await recorrerObjeto(requestBody, accesoSimetrico, codigoHash);
        return await JSON.parse(JSON.stringify(requestBody).replace(/(\*)/g,''));
    } catch (error) {
        console.log(`Error en los servicios: ${error}`);
        throw new Error(error.message);
    }
}

//Exportar modulos
module.exports = {encriptarAes}