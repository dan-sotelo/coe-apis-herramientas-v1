# coe-apis-herramientas-v1
Proyecto para el desarrollo de herramientas de CoE - APIs

Intrucciones para ejecutar el proyecto

1. Clonar el repositorio

        git clone https://github.com/dan-sotelo/coe-apis-herramientas-v1.git

2. Descargar los modulos

        npm install
        
3. El proyecto ya tiene configurado el host y puerto en el archivo .ENV, si se desea emplear un host o puerto diferente, se puede configurar desde ahí

        HOST = 'localhost
        PORT = '3005'
        
5. Inicializar el servidor

        npm run dev
        
6. Importar desde postman la coleccion que se encuentra en la carpeta postman
Nota: Ya sea para robustecer, cifrar o descifrar los atributos deseados, se debe indicar con un arterisco al inicio, por ejemplo:

        {
          "*datoCifrado": "123456789"
        }
