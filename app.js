// Importar los modulos necesarios
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const middUsuarios = require('./middlewares/midd.users');
const vistaPrincipal = require('./app/view/vista.principal');

// Confiuraciones globales
app.use(express.json());
app.use(cors());
app.use(middUsuarios.requestLimit);
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.set('views', __dirname + '/views');

// Inicializar el servidor
const iniciarServidor = async() =>{
    try{
        app.listen(process.env.PORT, () =>{
            console.log(`El servidor se ha iniciado correctamente en http://${process.env.HOST}:${process.env.PORT}`);
        });
    } catch(error) {
        console.log(`Error al iniciar el servidor: ${error}`);
    }
}

iniciarServidor();

// Inicializar las rutas del servidor
vistaPrincipal(app);