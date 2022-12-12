const express = require('express');
const { route } = require('.');
const router = express.Router();
//const { isLoggedIn } = require('../lib/auth'); 


//cambio de nombre, hace referencia a la conexión de la bd
const pool = require('../database');

/*                          ----------- LISTAR ------------------                         */
router.get('/prospectosList', async (req, res) =>{
    const prospecto = await pool.query('SELECT * FROM prospectos');
    res.render('publicidad/prospectosList',  { prospecto } )
});


/*jk33                          ----------- AGREGAR ------------------                         */
router.get('/add', (req, res) =>{
    res.render('publicidad/add');
});

router.post('/add', async (req, res) =>{
    //los datos los recibimos a través de un objeto res.body
    //objeto para almacenar las variables de la pagina
    const nuevo = {
        id: req.body.id,
        nombre: req.body.Nombre,
        apellidos: req.body.Apellido,
        telefono: (req.body.Telefono).replace(/[^0-9]+/g, ""),
        correo: req.body.Correo,
        fase: req.body.Fase,
        origen: req.body.Origen,
        motivo: req.body.Motivo,
        comentarios: req.body.Comentario,
        fechaAsignacion: req.body.fechaAsignacion,
        vendedorAsignado: req.body.vendedorAsignado,
        asignadoPor: req.body.Publicista
    };
    //inserción de las tarjetas a la BD ASINCRONA
    //req.flash('success', 'Prospecto registrado correctamente'); 
   await pool.query('INSERT INTO prospectos SET ?', [nuevo]);
   //console.log(nuevo)
    //res.redirect('/prospectosList');
    res.redirect('/prospectosLinks');
});



/*                          ----------- EDITAR ------------------                         */
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const nuevo = await pool.query('SELECT * FROM prospectos WHERE id=?', [id]);
    res.render('publicidad/edit', { nuevo: nuevo[0]});
});

router.post('/edit/:id', async (req, res) =>{
    const { id }= req.params;

    const nuevo = {
        nombre: req.body.Nombre,
        apellidos: req.body.Apellido,
        telefono: (req.body.Telefono).replace(/[^0-9]+/g, ""),
        correo: req.body.Correo,
        fase: req.body.Fase,
        origen: req.body.Origen,
        motivo: req.body.Motivo,
        comentarios: req.body.Comentario,
        fechaAsignacion: req.body.fechaAsignacion,
        vendedorAsignado: req.body.vendedorAsignado,
        asignadoPor: req.body.Publicista
    };
    //inserción de las tarjetas a la BD ASINCRONA
    await pool.query('UPDATE prospectos SET ? WHERE id= ?', [nuevo, id]);
    
    req.flash('success', 'Prospecto reasignado correctamente');
    res.render('publicidad/prospectosList');

});
/* --------------------------------------------------------------------------------------   */

/*                         ----------- ELIMINAR ------------------                         */
router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM prospectos WHERE id=?', [id]);
    req.flash('success', 'Prospecto elimnado correctamente');
    res.redirect('/prospectosList'); 
});
/* --------------------------------------------------------------------------------------   */




module.exports = router;