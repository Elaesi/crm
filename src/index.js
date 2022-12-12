/* ARCHIVO PRINCIPAL de la aplicación */

/* ***************************** MODULOS **************************** */
const express = require('express');
const morgan = require('morgan');
// -> para las plantillas html
const { engine } = require('express-handlebars');
// -> para inidicar a la app las rutas
const path = require('path');
// -> mensajes a través de la web
const flash = require('connect-flash');
// -> requerido para flash
const session = require('express-session');
// -> para guardar la sesión en la BD
const mysqlStore = require('express-mysql-session');
// -> importamos la base de datos
const { database } = require('./keys');
// -> metodos para la auth
const passport = require('passport');

/* ***************************** INICIALIZACIONES **************************** */
const app = express();

/* ***************************** AJUSTES **************************** */

// -> Puerto por el que sale la coneción
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
// -> Motor con el módulo express pra las vistas
app.engine(
  '.hbs',
  engine({
    // -> vista principal
    defaultLayout: 'main',
    // -> directorio y carpeta donde se encuentran las vistas
    layoutsDir: path.join(app.get('views'), 'layouts'),
    // -> directorio y carpeta de las vistas parciales
    partialsDir: path.join(app.get('views'),'partials'),
    // -> extension de los archivos
    extname: '.hbs',
    // -> libreria de los tiempos, fechas, viene de handlebars
    helpers: require('./librerias/handlebars'),
  })
);
// -> para el funcionamiento del motor
app.set('view engine', '.hbs');

/* ***************************** MIDDLEWARES **************************** */
// -> Muestra peticiones por consola
app.use(morgan('dev'));
// -> para aceptar  los datos que se envían en el formulario , para solo recibir cadenas simples
app.use(express.urlencoded({ extended: false }));
// -> para aceptar json
app.use(express.json());

/* ***************************** VARIABLES GLOBALES **************************** */
app.use((req, res, next) => {
  /* app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user; */
  next();
});

/* ***************************** ROUTES **************************** */
app.use(require('./rutas/'));
app.use(require('./rutas/authentication'));
app.use('/publicidad', require('./rutas/publicidad'));
//app.use('/ventas', require('./rutas/vendedores'));


/* ***************************** ARCHIVOS PUBLICOS **************************** */
app.use(express.static(path.join(__dirname, 'publico'))); 



/* ***************************** INICIAMOS EL SERVIDOR **************************** */
// -> Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en el puerto', app.get('port'));
});


