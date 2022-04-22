// Importar los modulos necesarios
const crypto = require('crypto');

//Definir funciones
const descencriptarRsa = (cipherText, privateKey) =>{
    try {
        privateKeyPEM = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
        const valorDescifrado = crypto.privateDecrypt({
            key: privateKeyPEM,
            padding: crypto.constants.RSA_PKCS1_PADDING,
            passphrase: ''
        }, Buffer.from(cipherText, 'base64'));
        return valorDescifrado.toString();
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(error.message);
    }
}

const recorrerArreglo = async(arreglo, accesoPrivado, requiereDescifrado) => {
    try {
        for (let indice = 0; indice < arreglo.length; indice++){
            if(typeof(arreglo[indice]) == "object" && Array.isArray(arreglo[indice])){
                await recorrerArreglo(arreglo[indice], accesoPrivado, requiereDescifrado);
            } else if(typeof(arreglo[indice]) == "object"){
                await recorrerObjeto(arreglo[indice], accesoPrivado);
            } else if (requiereDescifrado){
                arreglo[indice] = descencriptarRsa(arreglo[indice].toString(), accesoPrivado);
            }
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}


const recorrerObjeto = async(objeto, accesoPrivado) => {
    try{
        for(atributo in objeto){
            let requiereDescifrado = (atributo[0] == '*' ? true : false);
            if(typeof(objeto[atributo]) == "object" && Array.isArray(objeto[atributo])){
                await recorrerArreglo(objeto[atributo], accesoPrivado, requiereDescifrado);
            } else if (typeof(objeto[atributo]) == "object"){
                await recorrerObjeto(objeto[atributo], accesoPrivado);
            } else if(requiereDescifrado){
                objeto[atributo] = descencriptarRsa(objeto[atributo].toString(), accesoPrivado);
            }
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

// Definir servicios para la encriptación en RSA
const descifrarRsa = async(requestBody, accesoPrivado) => {
    try {
        await recorrerObjeto(requestBody, accesoPrivado);
        return await JSON.parse(JSON.stringify(requestBody).replace(/(\*)/g,''));
    } catch (error) {
        console.log(`Error en los servicios: ${error}`);
        throw new Error(error.message);
    }
}

//Exportar modulos
module.exports = {descifrarRsa}