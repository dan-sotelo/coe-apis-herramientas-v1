// Función para consumo del API
const consumoApi = async(recurso, metodo, requestBody) => {
    try {
        let datos;
        let respuesta;
        if(metodo=='get'){
            datos = await fetch('http://localhost:3005' + recurso);
            respuesta = await datos.json();
        } else{
            datos = await fetch(recurso, {
                method: metodo,
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            respuesta = await datos.json(requestBody);
        }
        return respuesta
    } catch (error) {
        console.log(error);
        throw new Error ('Error al consumir el API');
    }
}