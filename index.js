//dependecias
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

//conectar la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(error => console.log('error al conectar la base de datos'));

//dfinir puerto
const port = process.env.PORT || 3000;

//Habilitar pug
app.set('view engine','pug');

//obtener el año actual
app.use((req, res,next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    next();
});

//Agregar body parser para leer los dato del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/',router);

app.listen( port,() =>{
    console.log(`el servidor esta funcionando en el puerto ${port}`);
})
 