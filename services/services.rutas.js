// Importar los modulos necesarios

//Definir funciones
const rutasWeb = async() => {
    try {
        const rutas = [
            {
                nombre: "Robustecimiento",
                ruta: "/robustecimiento",
                descripcion: "Herramienta para realizar el robustecimiento de un objeto JSON",
                imagen: "/images/json.jpg"
            },
            {
                nombre: "Cifrado AES",
                ruta:"/cifrado/aes",
                descripcion: "Herramienta para cifrar y descifrar con algoritmo AES",
                imagen: "/images/aes.png"
            },
            {
                nombre: "Cifrado RSA",
                ruta: "/cifrado/rsa",
                descripcion: "Herramienta para cifrar y descifrar con algoritmo RSA",
                imagen: "/images/rsa.png"
            }
        ]
        return rutas;
    } catch (error) {
        
    }
}

module.exports = {rutasWeb};