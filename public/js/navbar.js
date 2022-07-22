// Inicialización del DOM para manipulacion del template para el catalogo de servicios
const menuServicios = document.getElementById('menuServicios');
const templateListaServicios = document.getElementById('templateListaServicios').content;

// Función para mostrar los servicios en el navbar en el documento HTML
const mostrarNavbar = async(servicios) =>{
    try {
        servicios.forEach((servicio) => {
            templateListaServicios.querySelector('li .dropdown-item').href = servicio.ruta;
            templateListaServicios.querySelector('li .dropdown-item').textContent = servicio.nombre;
            const clonLista = templateListaServicios.cloneNode(true);
            fragment.appendChild(clonLista);
        });
        menuServicios.appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}