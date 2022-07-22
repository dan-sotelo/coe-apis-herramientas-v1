// Inicialización del DOM para manipulacion del template para el catalogo de servicios
const btnRobustecer = document.getElementById('btnRobustecimiento');
const fragment = document.createDocumentFragment();

// Inicialización del consumo del API
document.addEventListener('DOMContentLoaded', async(evento) =>{
    try {
        const respuestaApi = await consumoApi('/rutas', 'get');
        await mostrarNavbar(respuestaApi.resultado);
    } catch (error) {
        console.log(error);
    }
});

btnRobustecer.addEventListener('click', async() =>{
    try {
        const bodyRequest = JSON.parse(document.getElementById('bodyRequest').value);
        const respuesta = await consumoApi('/herramientas/v1/robustecimiento','post',bodyRequest);
        let robustecimiento = '';
        respuesta.resultado.forEach(elemento => {
            robustecimiento += `| ${JSON.stringify(elemento)} |\n`;
        });
        document.getElementById('resultadoRobustecimiento').value = robustecimiento;
    } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
    }
})