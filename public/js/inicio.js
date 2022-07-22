// Inicialización del DOM para manipulacion del template para el catalogo de servicios
const catalogoServicios = document.getElementById('catalogoServicios');
const templateServicios = document.getElementById('templateServicio').content;
const fragment = document.createDocumentFragment();

// Mostrar cartas de servicios
const mostrarServicios = async(resultado) =>{
    try {
        resultado.forEach((servicio) => {
            templateServicios.querySelector('.card .card-img-top').src = servicio.imagen;
            templateServicios.querySelector('.card .card-body .card-title').textContent = servicio.titulo;
            templateServicios.querySelector('.card .card-body .card-text').textContent = servicio.descripcion;
            templateServicios.querySelector('.card .card-body .btn').href = servicio.ruta;
            const clonCartaServicios = templateServicios.cloneNode(true);
            fragment.appendChild(clonCartaServicios);
        });
        catalogoServicios.appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}

// Inicialización del consumo del API
document.addEventListener('DOMContentLoaded', async(evento) =>{
    try {
        const respuestaApi = await consumoApi('/rutas', 'get');
        await mostrarNavbar(respuestaApi.resultado);
        await mostrarServicios(respuestaApi.resultado);
    } catch (error) {
        console.log(error);
    }
})