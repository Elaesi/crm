/* ***************************** RUTAS PRICIPALES **************************** */


//requerimos el metodo para las rutas
const express = require('express');
//De el requerimos el modulo Router
const router = express.Router();


//trae esta ruta 
router.get('/', (req,res) =>{
    res.render(
        'index'
    );
});

//exportamos
module.exports = router;

