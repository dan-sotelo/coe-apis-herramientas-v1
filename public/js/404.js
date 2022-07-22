// Inicialización del DOM para manipulacion del template para el catalogo de servicios
const fragment = document.createDocumentFragment();

// Inicialización del consumo del API
document.addEventListener('DOMContentLoaded', async(evento) =>{
    try {
        const respuestaApi = await consumoApi('/rutas', 'get');
        await mostrarNavbar(respuestaApi.resultado);
    } catch (error) {
        console.log(error);
    }
})