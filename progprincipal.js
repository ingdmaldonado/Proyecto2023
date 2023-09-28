
const PORT = 3000;
const ClaseExpress = require("express");
const ServidorWeb = ClaseExpress();

ServidorWeb.use(ClaseExpress.static("FrontEnd"));
ServidorWeb.use(ClaseExpress.json());
ServidorWeb.use(ClaseExpress.text());
ServidorWeb.use(ClaseExpress.urlencoded({extended:false}));

const {Pool} = require("pg");

const ConexionDB = new Pool(
    {
        host:'localhost',
        port:'5432',
        database:'Base2023',
        user:'postgres',
        password:'12345678'
    })

module.exports = {ConexionDB};

/*************************************************************************/
/* PRIMERO => END POINT => Servicio WEB => Servicio REST => Get por (ID) */
/*************************************************************************/

ServidorWeb.get("/cliente/:ID",async(req,res)=>
{
    const ID = req.params.ID;

    let SQL = 'select * from cliente where clienteid = $1';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[ID]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente recuperado por ID',
            result_rows:Resultado.rowCount,
            result_proceso:'GET CLIENTE POR ID',
            result_data:Resultado.rows[0]
        }          

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'GET CLIENTE POR ID',
            result_data:''
        }        
    }
    res.json(Salida);
})

/***************************************************************************/
/* SEGUNDO => END POINT => Servicio WEB => Servicio REST => Get por (CUIT) */
/***************************************************************************/

ServidorWeb.get("/clienteporcuit/:clientecuit",async(req,res)=>
{
    const clientecuit = req.params.clientecuit;

    let SQL = 'select * from cliente where clientecuit = $1';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[clientecuit]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente recuperado por CUIT',
            result_rows:Resultado.rowCount,
            result_proceso:'GET CLIENTE POR CUIT',
            result_data:Resultado.rows[0]
        }          

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'GET CLIENTE POR CUIT',
            result_data:''
        }        
    }
    res.json(Salida);
})


/****************************************************************************/
/* TERCERO => END POINT => Servicio WEB => Servicio REST => Get por Nombre  */
/****************************************************************************/

ServidorWeb.get("/clientePorNombre/",async(req,res)=>
{
    const NOMBRE = req.query.nombre;

    let SQL = 'select * from cliente where clientenombre like $1 limit 50';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[`%${NOMBRE}%`]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente recuperado por NOMBRE',
            result_rows:Resultado.rowCount,
            result_proceso:'GET CLIENTE POR NOMBRE',
            result_data:Resultado.rows
        }        

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'GET CLIENTE POR NOMBRE',
            result_data:''
        }        
    }
    res.json(Salida);
})


/****************************************************************************/
/* TERCERO => END POINT => Servicio WEB => Servicio REST => Get por CUIT   */
/****************************************************************************/

ServidorWeb.get("/clientePorCuit/:clientecuit",async(req,res)=>
{
    const clientecuit = req.params.clientecuit

    let SQL = 'select * from cliente where clientecuit = $1';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[clientecuit]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente recuperado por NOMBRE',
            result_rows:Resultado.rowCount,
            result_proceso:'GET CLIENTE POR CUIT',
            result_data:Resultado.rows[0]
        }          

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'GET CLIENTE POR CUIT',
            result_data:''
        }        
    }
    res.json(Salida);
})

/*****************************************************************************/
/* CUARTO => END POINT => Servicio WEB => Servicio REST => post por cliente  */
/*****************************************************************************/

ServidorWeb.post("/cliente/",async(req,res)=>
{
    const {clientecuit,clientenombre} = req.body;

    let SQL = 'insert into cliente (clientecuit,clientenombre) values ($1,$2) returning *';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[clientecuit,clientenombre]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente Insertado',
            result_rows:Resultado.rowCount,
            result_proceso:'POST CLIENTE',
            result_data:Resultado.rows[0]
        }          

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'POST CLIENTE',
            result_data:''
        }        
    }
    res.json(Salida);
})


/*****************************************************************************/
/* QUINTO => END POINT => Servicio WEB => Servicio REST => put por cliente  */
/*****************************************************************************/

ServidorWeb.put("/cliente/",async(req,res)=>
{
    const {clienteid,clientecuit,clientenombre} = req.body;

    let SQL = 'update cliente set clientecuit = $1, clientenombre = $2 where clienteid = $3 returning *';

    let Resultado = '';

    try {
        
        Resultado = await ConexionDB.query(SQL,[clientecuit,clientenombre,clienteid]);

        Salida = 
        {
            result_estado:'ok',
            result_message:'Cliente Actualizado',
            result_rows:Resultado.rowCount,
            result_proceso:'PUT CLIENTE',
            result_data:Resultado.rows[0]
        }         

    } catch (error) 
    {
        Salida = 
        {
            result_estado:'error',
            result_message:error.message,
            result_rows:0,
            result_proceso:'PUT CLIENTE',
            result_data:''
        }        
    }
    res.json(Salida);
})


/************************************************************/
/************** ARRANCAMOS LA APLICACIÓN ********************/
/************************************************************/

ServidorWeb.listen(PORT,()=>
{
    console.log("aplication is running");
})
