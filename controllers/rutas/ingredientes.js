const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    res.send('"Titulo": "la pupuseria"');
})

// aca generamos una consulta general con un select y returna un json se consulta http://localhost:3000/ingredientes

router.get('/ingredientes', (req, res) => { //aca difinimos la ruta en la que vamos a consultar
    req.getConnection((err, conn) => {
        if (err) return res.send(err); // esto es general para todos

        conn.query('Select * from ingrediente', (err, rows) => { //aca definimos la consutla como tal que queremos para este caso es solo para un select ya que estamos obteniendo un get
            if (err) return res.send(); // esto es general para todos 

            res.json(rows) // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
});

// Este metodo es para poder consultar un dato en especifico la forma para consultarlo es http://localhost:3000/ingredientes/cod 
router.get('/ingredientes/:cod', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('select * from ingrediente WHERE cod_ingrediente = ? ', [req.params.cod], (err, rows) => { //aca definimos la consutla como tal este caso es un select en especifico
            if (err) return res.send(); // esto es general para todos 

            res.json(rows) // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
})

//este metodo como tal sirve para poder generar una peticion de tipo post esta funciona para poder ingresar datos se consulta http://localhost:3000/ingredientes

router.post('/ingredientes', (req, res) => { // para este caso es tipo post con esto generamos ingreso de datos
    req.getConnection((err, conn) => {
        if (err) return res.send(err); // esto es general para todos
        console.log([req.body]);
        conn.query('INSERT INTO ingrediente set ? ', [req.body], (err, rows) => { //aca definimos la consutla como tal este caso es un insert para insertar datos a una tabla este es tipo post
            if (err) return res.send(); // esto es general para todos 

            res.send('se ingreso el ingrediente') // aca estamos obteniendo las rows y las estamos mandando como json a la consulta
        });
    });
})


// Este metodo es para poder eliminar un dato en especifico la forma para consultarlo es http://localhost:3000/ingredientes/cod 
router.delete('/ingredientes/:cod', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('DELETE FROM ingrediente WHERE cod_ingrediente = ? ', [req.params.cod], (err, rows) => { //aca definimos la consutla como tal este caso es un delete
            if (err) return res.send(); // esto es general para todos 

            res.send('se elimino el ingrediente')
        });
    });
})

//este metodo es para poder actualizar registros en especifico la forma para consultarlo es http://localhost:3000/ingredientes/cod y se envia el json

router.put('/ingredientes/:cod', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        console.log(req.body);
        console.log(req.params.cod);
        conn.query('UPDATE ingrediente set ? WHERE cod_ingrediente = ?', [req.body, req.params.cod], (err, rows) => { //aca definimos la consutla como tal este es un uptadate
            if (err) return res.send(); // esto es general para todos 

            res.send('se actualizo el registro del ingrediente')
        });
    });
})



module.exports = router;