// Definir funciones
const asignarRespuestaObjeto = async(objetoPrincipal, objetoPrueba, atributo, respuestas, robustecimiento, valor, requerido) =>{
    let variableAuxiliar = objetoPrueba[atributo];
    console.log('');
    for (tipo in respuestas){
        if(!requerido && (tipo == 'nulo' || tipo == 'vacio')) { continue };
        if(tipo != valor){
            objetoPrueba[atributo] = respuestas[tipo];
            console.log(`| ${(JSON.stringify(objetoPrincipal).replace(/(\*)/g,''))} |`);
            robustecimiento.push(JSON.parse(JSON.stringify(objetoPrincipal).replace(/(\*)/g,'')));
        }
    }
    objetoPrueba[atributo] = variableAuxiliar;
}

const asignarRespuestaArray = async(objetoPrincipal, arreglo, indice, respuestas, robustecimiento, valor, requerido) =>{
    console.log('');
    for (tipo in respuestas){
        if(!requerido && (tipo == 'nulo' || tipo == 'vacio')) { continue };
        if (tipo != valor) {
            arreglo[indice] = respuestas[tipo];
            console.log(`| ${(JSON.stringify(objetoPrincipal).replace(/(\*)/g,''))} |`);
            robustecimiento.push(JSON.parse(JSON.stringify(objetoPrincipal).replace(/(\*)/g,'')));
        }
    }
}

const recorrerArreglo = async (objetoPrincipal, arreglo, respuestas, robustecimiento, requerido) =>{
    for (let indice = 0; indice < arreglo.length; indice ++){
        let variableAuxiliar = arreglo[indice];
        if(typeof(arreglo[indice]) == "string"){
            asignarRespuestaArray(objetoPrincipal, arreglo, indice, respuestas, robustecimiento, "cadena", requerido);
        } else if(typeof(arreglo[indice]) == "number" && Number.isInteger(arreglo[indice])){
            asignarRespuestaArray(objetoPrincipal, arreglo, indice, respuestas, robustecimiento, "entero", requerido);
        } else if(typeof(arreglo[indice]) == "number"){
            asignarRespuestaArray(objetoPrincipal, arreglo, indice, respuestas, robustecimiento, "flotante", requerido);
        } else if(typeof(arreglo[indice]) == "boolean"){
            asignarRespuestaArray(objetoPrincipal, arreglo, indice, respuestas, robustecimiento, "boleano", requerido);
        } else if(typeof(arreglo[indice]) == "object" && Array.isArray(arreglo[indice])){
            await recorrerArreglo(objetoPrincipal, arreglo[indice], respuestas, robustecimiento, requerido);
        } else if(typeof(arreglo[indice]) == "object") {
            await recorrerObjeto(objetoPrincipal, arreglo[indice], respuestas, robustecimiento);
        }
        arreglo[indice] = variableAuxiliar;
    }
}

const recorrerObjeto = async(objetoPrincipal, objetoPrueba, respuestas, robustecimiento) =>{
    for(atributo in objetoPrueba){
        let requerido = (atributo[0] == '*' ? true : false);
        if(typeof(objetoPrueba[atributo]) == "string"){
            asignarRespuestaObjeto(objetoPrincipal, objetoPrueba, atributo, respuestas, robustecimiento, "cadena", requerido);
        } else if(typeof(objetoPrueba[atributo]) == "number" && Number.isInteger(objetoPrueba[atributo])){
            asignarRespuestaObjeto(objetoPrincipal, objetoPrueba, atributo, respuestas, robustecimiento, "entero", requerido);
        } else if(typeof(objetoPrueba[atributo]) == "number"){
            asignarRespuestaObjeto(objetoPrincipal, objetoPrueba, atributo, respuestas, robustecimiento, "flotante", requerido);
        } else if(typeof(objetoPrueba[atributo]) == "boolean"){
            asignarRespuestaObjeto(objetoPrincipal, objetoPrueba, atributo, respuestas, robustecimiento, "boleano", requerido);
        } else if(typeof(objetoPrueba[atributo]) == "object" && Array.isArray(objetoPrueba[atributo])){
            await recorrerArreglo(objetoPrincipal, objetoPrueba[atributo], respuestas, robustecimiento, requerido);
        } else if(typeof(objetoPrueba[atributo] == "object")){
            await recorrerObjeto(objetoPrincipal, objetoPrueba[atributo], respuestas, robustecimiento);
        }
    }
    return robustecimiento;
}

// Definir servicios para la app
const robustecer = async(requestBody, respuestas) =>{
    try {
        let robustecimiento = [];
        return await recorrerObjeto(requestBody, requestBody, respuestas, robustecimiento, true);
    } catch (error) {
        console.log(`Error en los servicios: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar modulos
module.exports = {robustecer}