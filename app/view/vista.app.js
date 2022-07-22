// Importar los modulos necesarios
const appServiciosRutas = require('../../services/services.rutas');

// Definir las vistas
module.exports = async(app) =>{
    // Endpoint para mostrar la lista de servicios y direcciones
    app.get('/rutas', async(req, res) =>{
        try {
            const resultado = await appServiciosRutas.rutasWeb();
            res.status(200).json({mensaje: 'Operación exitosa', resultado});
        } catch (error) {
            console.log(error.message);
            res.status(400).json({message: error.message});
        }
    })

    // Endpoint para mostrar página de inicio
    app.get('/inicio', async(req, res) =>{
        try{
            res.render('inicio',{
                titulo:"Inicio",
                descripcion:"Página de inicio"
            })
        } catch(error) {
            console.log(`Error al renderizar la página: ${error}`);
            res.status(500).json({mensaje: 'Error interno de servidor', error: error.message});
        }
    })

    // Endpoint para mostrar la página del robustecimiento
    app.get('/robustecimiento', async(req, res) =>{
        try {
            res.render('robustecimiento',{
                titulo:"Robustecimiento",
                descripcion: "Herramienta de robustecimiento"
            })
        } catch (error) {
            console.log(`Error al renderiza la página: ${error}`)
        }
    })

    // Endpoint para el robustecimiento
    app.use((req, res) =>{
        try{
            res.render('404', {
                titulo:"404 Not Found",
                descripcion: "404 Página no encontrada"
            })
        } catch(error) {
            console.log(`Error al renderizar la página: ${error}`);
            res.status(500).json({mensaje: 'Error interno de servidor', error: error.message});
        }
    })
}