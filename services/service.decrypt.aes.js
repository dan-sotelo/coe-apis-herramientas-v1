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

const descencriptarRsa = (textoCifrado, accesoSimetrico, codigoHash) =>{
    try {
        const iv_cipherText_hmac = Buffer.from(textoCifrado, 'base64');
        const aesKey = Buffer.from(accesoSimetrico, "base64");
        const hmacKey = Buffer.from(codigoHash, 'utf8');
        const macLength = crypto.createHmac('sha256', hmacKey).digest().length;
        const cipherTextLength = iv_cipherText_hmac.length - macLength;
        const iv = iv_cipherText_hmac.slice(0, 16);
        const cipherText = iv_cipherText_hmac.slice(16, cipherTextLength);
        const decipher = crypto.createDecipheriv(getAlgorithm(aesKey), aesKey, iv);
        let decrypted = decipher.update(cipherText);
        decrypted += decipher.final();
        return decrypted.toString().replace(/(\n)/g,'');
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
                arreglo[indice] = descencriptarRsa(arreglo[indice].toString(), accesoSimetrico, codigoHash);
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
                objeto[atributo] = descencriptarRsa(objeto[atributo].toString(), accesoSimetrico, codigoHash);
            }
        }
    } catch (error) {
        console.log(`Error al recorrer el objeto: ${error}`);
        throw new Error(error.message);
    }
}

// Definir servicios para la encriptación en RSA
const descifrarAes = async(requestBody, accesoSimetrico, codigoHash) => {
    try {
        await recorrerObjeto(requestBody, accesoSimetrico, codigoHash);
        return await JSON.parse(JSON.stringify(requestBody).replace(/(\*)/g,''));
    } catch (error) {
        console.log(`Error en los servicios: ${error}`);
        throw new Error(error.message);
    }
}

//Exportar modulos
module.exports = {descifrarAes}