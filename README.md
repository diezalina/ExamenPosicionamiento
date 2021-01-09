# Examen Posicionamiento
Este es un repositorio que utiliza el MEN Stack:

### Mongo:
La base de datos se encuentra en un servidor de MongoDB ATLAS.

### Express
Es la dependencia encargada de procesar las vistas con las que uno logra interactuar con el sistema.

### Node
Con lo que se maneja y logra correr la aplicacion, ademas de crear las llamadas a la BDD.

## Para correr el proyecto se utiliza el siguiente comando
```bash
node app
```

Empezara a correr en el puerto 3000, gracias a la dependencia `nodemon` se pueden hacer actualizaciones y probarse al mismo tiempo.

## Como hacer cambios en el repo
Se recomienda utilizar la siguiente manera para llevar a cabo actualizaciones:

1. Crear una nueva rama local en base a master
        
        git checkout -b "new_feature"

2. Al realizar los cambios, se deben testear la funcionalidad y asegurar el funcionamiento del sistema.

3. Se creara un Pull Request en base a la nueva rama, la cual se encontrara en el repositorio remoto para que git controle que no haya conflictos con los cambios.

### De ahi en mas el sistema se encuentra funcional, es sencillo pero si usted quiere hacer un nuevo cambio solamente haga una solicitud para ello a traves del sistema establecido.